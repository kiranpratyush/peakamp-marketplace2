'use server';

import { removeItem } from './remove-item';
import { updateQuantity } from './update-quantity';
import { parseWithZod } from '@conform-to/zod';

type LineItem = {
  selectedOptions: any;
  productEntityId: number;
  variantEntityId: number | null;
  id: string;
  quantity: number;
};

export const updateLineItem = async () => {
  return {
    lineItems: [
      {
        id: "1",
        quantity: 2,
        productEntityId: 101,
        variantEntityId: 201,
        selectedOptions: [],
      },
    ],
    lastResult: null,
  };
};
export const mockLineItemAction= async (state:any, payload:any) => {
  const intent = payload.get("intent");
  const id = payload.get("id");

  switch (intent) {
    case "increment":
      return {
        ...state,
        lineItems: state.lineItems.map((item:any) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case "decrement":
      return {
        ...state,
        lineItems: state.lineItems.map((item:any) =>
          item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
        ),
      };
    case "delete":
      return {
        ...state,
        lineItems: state.lineItems.filter((item:any) => item.id !== id),
      };
    default:
      return state;
  }
};
