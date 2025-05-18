'use server';

import { revalidateTag } from 'next/cache';




interface Props {
  checkoutEntityId: string;
  consignmentEntityId: string;
  shippingOptionEntityId: string;
}

export const addShippingCost = async ({
  checkoutEntityId,
  consignmentEntityId,
  shippingOptionEntityId,
}: Props) => {
return {}
};
