"use server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import type {
  CartLineItem,
  CartState,
  Action,
} from "@/design-system/sections/cart/client";
import { getProductImageUrl } from "@/constants/images";
import { unstable_expirePath } from "next/cache";
const cartLineItemActionFormDataSchema = z.object({
  id: z.string().min(1),
  intent: z.enum(["increment", "decrement", "delete"]),
});
export const lineItemAction: Action<CartState<CartLineItem>, FormData> = async (
  prevState,
  formData
) => {
  const submission = parseWithZod(formData, {
    schema: cartLineItemActionFormDataSchema,
  });

  if (submission.status !== "success") {
    return {
      ...prevState,
      lastResult: submission.reply(),
    };
  }

  const { id, intent } = submission.value;

  try {
    const existingItem = await prisma.cartItem.findUnique({
      where: { id },
      include: {
        product: true,
      },
    });

    if (!existingItem) {
      return {
        ...prevState,
        lastResult: {
          status: "error",
          error: { id: ["Cart item not found"] },
        },
      };
    }

    if (intent === "increment") {
      await prisma.cartItem.update({
        where: { id },
        data: { quantity: existingItem.quantity + 1 },
      });
    }

    if (intent === "decrement") {
      if (existingItem.quantity > 1) {
        await prisma.cartItem.update({
          where: { id },
          data: { quantity: existingItem.quantity - 1 },
        });
      }
    }

    if (intent === "delete") {
      await prisma.cartItem.delete({ where: { id } });
    }

    // Reload updated line items
    const updatedItems = await prisma.cartItem.findMany({
      where: { cartId: existingItem.cartId },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });

    const updatedLineItems: CartLineItem[] = updatedItems.map((item) => ({
      id: item.id,
      image: {
        alt: item.product.name,
        src: getProductImageUrl(item.product.images[0]?.url),
      },
      title: item.product.name,
      subtitle: item.product.summary ?? "",
      quantity: item.quantity,
      price: `₹${(item.product.averageSellPrice * item.quantity).toFixed(2)}`,
    }));
    unstable_expirePath("/cart");
    return {
      lineItems: updatedLineItems,
      lastResult: submission.reply(),
    };
  } catch (err) {
    console.error("Failed to update cart:", err);
    return {
      ...prevState,
      lastResult: {
        status: "error",
        error: { _form: ["Unexpected error occurred"] },
      },
    };
  }
};
