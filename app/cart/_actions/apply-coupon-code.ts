'use server';

import { revalidateTag } from 'next/cache';






export const applyCouponCode = async ({ checkoutEntityId, couponCode }: any) => {
  return {
    checkout: {
      entityId: checkoutEntityId,
      appliedCoupon: {
        code: couponCode,
        discount: "10.0",
      },
    },
  };
};
