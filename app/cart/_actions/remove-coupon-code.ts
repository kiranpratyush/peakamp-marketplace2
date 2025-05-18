'use server';

interface Props {
  checkoutEntityId: string;
  couponCode: string;
}

export const removeCouponCode = async ({ checkoutEntityId, couponCode }: Props) => {
  return {
    checkout: {
      entityId: checkoutEntityId,
      removedCoupon: {
        code: couponCode,
      },
    },
  };
};
