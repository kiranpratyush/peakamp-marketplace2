'use server';

export const updateShippingInfo = async () => {
  return {
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
  };
};
export const mockShippingAction = async (state:any, payload:any) => {
  const intent = payload.get("intent");

  switch (intent) {
    case "update":
      return {
        ...state,
        address: {
          country: payload.get("country") || state.address?.country,
          city: payload.get("city") || state.address?.city,
          state: payload.get("state") || state.address?.state,
          postalCode: payload.get("postalCode") || state.address?.postalCode,
        },
      };
    case "selectOption":
      return {
        ...state,
        shippingOption: {
          label: payload.get("label") as string,
          value: payload.get("value") as string,
          price: payload.get("price") as string,
        },
      };
    default:
      return state;
  }
};