'use server';

import { SubmissionResult } from '@conform-to/react';



interface State {
  lastResult: SubmissionResult | null;
  successMessage?: string;
}
export async function wishlistAction(payload: FormData): Promise<void> {
  console.log("wishlistAction", payload);
}



export async function addToNewWishlist(
  prevState: Awaited<State>,
  formData: FormData,
): Promise<State> {

  const result = {lastResult: null, successMessage: "success"} as State;
  return result;
}
