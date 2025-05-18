'use server';

export async function removeItem({ lineItemEntityId }: { lineItemEntityId: string }) {
  return {
    cart: {
      entityId: "12345",
      lineItems: [],
    },
  };
}
