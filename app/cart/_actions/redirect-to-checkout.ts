'use server';

import { SubmissionResult } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { z } from 'zod';

import { redirect } from 'next/navigation';

export const redirectToCheckout = async (
  _lastResult: SubmissionResult | null,
  formData: FormData,
): Promise<SubmissionResult | null> => {
  

  const submission = parseWithZod(formData, { schema: z.object({}) });

  const cartId = "hello"

  if (!cartId) {
    return submission.reply({ formErrors: ["cart not found"] });
  }

  return redirect('/checkout');
};
