'use server';

import { revalidateTag } from 'next/cache';

interface AddProps {
  checkoutEntityId: string;
  address: {
    countryCode: string;
    city?: string;
    stateOrProvince?: string;
    postalCode?: string;
  };
  lineItems: Array<{ quantity: number; lineItemEntityId: string }>;
}

export const addCheckoutShippingConsignments = async ({
  checkoutEntityId,
  address,
  lineItems,
}: AddProps) => {
  return {
    checkout: {
      entityId: checkoutEntityId,
      shippingConsignments: [
        {
          availableShippingOptions: [
            {
              cost: { value: "5.0" },
              description: "Standard Shipping",
              entityId: "701",
            },
          ],
        },
      ],
    },
  };
};

interface UpdateProps {
  checkoutEntityId: string;
  shippingId: string;
  address: {
    countryCode: string;
    city?: string;
    stateOrProvince?: string;
    postalCode?: string;
  };
  lineItems: Array<{ quantity: number; lineItemEntityId: string }>;
}

export const updateCheckoutShippingConsignment = async ({
  checkoutEntityId,
  address,
  shippingId,
  lineItems,
}: UpdateProps) => {
  return {
    checkout: {
      entityId: checkoutEntityId,
      shippingConsignments: [
        {
          availableShippingOptions: [
            {
              cost: { value: "5.0" },
              description: "Standard Shipping",
              entityId: "701",
            },
          ],
        },
      ],
    },
  };
};
