const mockCountries = [
  {
    entityId: 1,
    name: "United States",
    code: "US",
    statesOrProvinces: [
      { entityId: 101, name: "California", abbreviation: "CA" },
      { entityId: 102, name: "New York", abbreviation: "NY" },
      { entityId: 103, name: "Texas", abbreviation: "TX" },
    ],
  },
  {
    entityId: 2,
    name: "Canada",
    code: "CA",
    statesOrProvinces: [
      { entityId: 201, name: "Ontario", abbreviation: "ON" },
      { entityId: 202, name: "Quebec", abbreviation: "QC" },
      { entityId: 203, name: "British Columbia", abbreviation: "BC" },
    ],
  },
  {
    entityId: 3,
    name: "United Kingdom",
    code: "UK",
    statesOrProvinces: [],
  },
];


const mockCartData = {
  site: {
    cart: {
      entityId: "12345",
      version: 1,
      currencyCode: "USD",
      discountedAmount: {
        currencyCode: "USD",
        value: "10.0",
      },
      lineItems: {
        physicalItems: [
          {
            name: "Modern Chair",
            brand: "Furniture Co.",
            sku: "MOD-CHAIR-001",
            image: {
              url: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            entityId: "101",
            quantity: 2,
            productEntityId: "201",
            variantEntityId: "301",
            extendedListPrice: {
              currencyCode: "USD",
              value: "200.0",
            },
            extendedSalePrice: {
              currencyCode: "USD",
              value: "180.0",
            },
            originalPrice: {
              currencyCode: "USD",
              value: "100.0",
            },
            listPrice: {
              currencyCode: "USD",
              value: "90.0",
            },
            selectedOptions: [
              {
                __typename: "CartSelectedMultipleChoiceOption",
                entityId: 401,
                name: "Color",
                value: "Red",
                valueEntityId: 501,
              },
              {
                __typename: "CartSelectedNumberFieldOption",
                entityId: "402",
                name: "Size",
                number: 2
              },
              {
                __typename: "CartSelectedTextFieldOption",
                entityId: "403",
                name: "Custom Text",
                text: "Hello World",
              },
              {
                __typename: "CartSelectedDateFieldOption",
                entityId: "403",
                name: "Custom Text",
                date: {
                  utc: "2023-10-01T00:00:00Z",
                },
              },
            ],
            url: "/products/modern-chair",
          },
        ],
        digitalItems: [
          {
            name: "E-Book: Modern Design",
            brand: "Books Co.",
            sku: "EBOOK-MOD-001",
            image: {
              url: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            entityId: "102",
            quantity: 1,
            productEntityId: "202",
            variantEntityId: "302",
            extendedListPrice: {
              currencyCode: "USD",
              value: "20.0",
            },
            extendedSalePrice: {
              currencyCode: "USD",
              value: "15.0",
            },
            originalPrice: {
              currencyCode: "USD",
              value: "20.0",
            },
            listPrice: {
              currencyCode: "USD",
              value: "15.0",
            },
            selectedOptions: [],
            url: "/products/e-book-modern-design",
          },
        ],
        totalQuantity: 3,
      },
    },
    checkout: {
      entityId: "12345",
      subtotal: {
        currencyCode: "USD",
        value: "195.0",
      },
      grandTotal: {
        currencyCode: "USD",
        value: "205.0",
      },
      taxTotal: {
        currencyCode: "USD",
        value: "10.0",
      },
      cart: {
        currencyCode: "USD",
      },
      coupons: [
        {
          code: "DISCOUNT10",
          discountedAmount: {
            currencyCode: "USD",
            value: "10.0",
          },
        },
      ],
      shippingConsignments: [
        {
          entityId: "601",
          availableShippingOptions: [
            {
              cost: {
                value: "5.0",
              },
              description: "Standard Shipping",
              entityId: "701",
              isRecommended: true,
            },
          ],
          selectedShippingOption: {
            entityId: "701",
            description: "Standard Shipping",
            cost: {
              value: "5.0",
            },
          },
          address: {
            city: "New York",
            countryCode: "US",
            stateOrProvince: "NY",
            postalCode: "10001",
          },
        },
      ],
      handlingCostTotal: {
        value: "0.0",
      },
      shippingCostTotal: {
        currencyCode: "USD",
        value: "5.0",
      },
    },
  },
  geography: {
    countries: [
      {
        entityId: 1,
        name: "United States",
        code: "US",
        statesOrProvinces: [
          { entityId: 101, name: "California", abbreviation: "CA" },
          { entityId: 102, name: "New York", abbreviation: "NY" },
        ],
      },
      {
        entityId: 2,
        name: "Canada",
        code: "CA",
        statesOrProvinces: [
          { entityId: 201, name: "Ontario", abbreviation: "ON" },
          { entityId: 202, name: "Quebec", abbreviation: "QC" },
        ],
      },
    ],
  },
};



export const getCart = async (variables: any) => {

  return mockCartData;
};

export const getShippingCountries = async (geography: any) => {
 
  return mockCountries;
};
