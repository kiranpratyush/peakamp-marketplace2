"use server";
import { prisma } from "@/lib/db"; // adjust path to match your project

export async function getOrderDetailsForUser(email: string) {
  const userWithOrders = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      orders: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          items: {
            select: {
              id: true,
              quantity: true,
              condition: true,
              comment: true,
              createdAt: true,
              addressType: true,
              firstName: true,
              lastName: true,
              companyName: true,
              phoneNumber: true,
              streetAddress: true,
              apartmentSuite: true,
              city: true,
              country: true,
              postalcode: true,
              state: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  averageSellPrice: true,
                  unit: true,
                  images: {
                    select: {
                      url: true,
                      altText: true,
                    },
                    take: 1, // You can fetch more images if needed
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!userWithOrders) {
    throw new Error(`User with email ${email} not found.`);
  }

  return userWithOrders.orders;
}
