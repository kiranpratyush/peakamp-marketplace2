'use server';

export interface UpdateProductQuantityParams {
  lineItemEntityId: string;
  productEntityId: string;
  quantity: number;
  variantEntityId?: string;
  selectedOptions?: Record<string, any>;
}

export const updateQuantity = async ({
  lineItemEntityId,
  productEntityId,
  quantity,
  variantEntityId,
  selectedOptions,
}: UpdateProductQuantityParams) => {
  return {
    cart: {
      entityId: "12345",
      lineItems: [
        {
          id: lineItemEntityId,
          quantity,
          productEntityId,
          variantEntityId,
          selectedOptions,
        },
      ],
    },
  };
};
