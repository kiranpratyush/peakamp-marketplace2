"use server";
import { prisma } from "@/lib/db";
import { FormValues } from "./address_action";
import { revalidatePath } from "next/cache";

export async function checkoutActionForUser(
  data: FormValues,
  userEmail: string
) {
  return await prisma.$transaction(async (tx: any) => {
    const user = await tx.user.findUnique({
      where: { email: userEmail },
      include: {
        Cart: {
          include: {
            items: {
              include: {
                product: {
                  include: { images: true },
                },
              },
            },
          },
        },
      },
    });

    if (!user) throw new Error("User not found");

    const cart = user.Cart;
    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    // 2. Create the Order
    const order = await tx.order.create({
      data: {
        userId: user.id,
        status: "PENDING",
        items: {
          create: cart.items.map((item: any) => ({
            productId: item.product.id,
            quantity: item.quantity,
            addressType: data.name || "Shipping",
            firstName: data.firstName,
            lastName: data.lastName,
            companyName: data.companyName,
            phoneNumber: data.phoneNumber,
            streetAddress: data.streetAddress,
            apartmentSuite: data.apartmentSuite,
            city: data.city,
            country: data.country,
            postalcode: data.postalcode,
            state: data.state,
          })),
        },
      },
    });

    // 3. Delete cart items
    await tx.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });
    revalidatePath("/", "layout");
    return {
      success: true,
      orderId: order.id,
    };
  });
}
