"use server";
import { SubmissionResult } from "@conform-to/react";
import { ReactNode } from "react";
import { Field, schema } from "@/design-system/sections/product-detail/schema";
import { parseWithZod } from "@conform-to/zod";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";
interface State {
  fields: Field[];
  lastResult: SubmissionResult | null;
  successMessage?: ReactNode;
}
export const addToCart = async (
  prevState: State,
  payload: FormData
): Promise<{
  fields: Field[];
  lastResult: SubmissionResult | null;
  successMessage?: ReactNode;
}> => {
  console.log(prevState, payload);
  const submission = parseWithZod(payload, {
    schema: schema(prevState.fields),
  });
  if (submission.status != "success") {
    return { lastResult: submission.reply(), fields: prevState.fields };
  }
  const productId = submission.value.id;
  const quantity = Number(submission.value.quantity);
  console.log(productId, quantity);
  try {
    await addOrCreateCart(productId, quantity);
    return {
      lastResult: submission.reply(),
      fields: prevState.fields,
      successMessage: <Link href="/cart">Item added to cart</Link>,
    };
  } catch (error) {
    console.log(error);
    return {
      lastResult: submission.reply({ formErrors: ["Some thing went wrong"] }),
      fields: prevState.fields,
    };
  }

  return { lastResult: null, fields: prevState.fields };
};

async function addOrCreateCart(productId: any, quantity: any) {
  // 1. Define dummy user fields
  const dummyEmail = "dummy@example.com";

  // 2. Ensure user exists
  let user = await prisma.user.findUnique({ where: { email: dummyEmail } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: dummyEmail,
        name: "Dummy User",
      },
    });
  }
  if (!productId || quantity < 1) {
    throw new Error("Invalid product or quantity");
  }
  let cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: true },
  });

  if (!cart) {
    // 2. Create a new cart with item
    await prisma.cart.create({
      data: {
        userId: user.id,
        items: {
          create: {
            productId,
            quantity,
          },
        },
      },
    });
  } else {
    // 3. Check if the item already exists in cart
    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      // 4. Update quantity
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    } else {
      // 5. Add new item to cart
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }
  }

  // Optional: revalidate cart path
  revalidatePath("/cart");

  return {
    status: "success",
    successMessage: "Product added to cart",
  };
}
