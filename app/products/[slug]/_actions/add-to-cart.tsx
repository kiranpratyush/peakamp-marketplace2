"use server"
import { SubmissionResult } from '@conform-to/react';
import { ReactNode } from 'react';
import { Field, schema } from '@/design-system/sections/product-detail/schema';
interface State {
  fields: Field[];
  lastResult: SubmissionResult | null;
  successMessage?: ReactNode;
}
export const addToCart = async (
  prevState: State,
  payload: FormData,
): Promise<{
  fields: Field[];
  lastResult: SubmissionResult | null;
  successMessage?: ReactNode;
}> => {
  
  return { lastResult: null, fields: prevState.fields };

}
