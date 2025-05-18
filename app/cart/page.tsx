import { Metadata } from 'next';


import { Streamable } from '@/lib/streamable';
import { Cart as CartComponent, CartEmptyState } from '@/design-system/sections/cart';
import { redirectToCheckout } from './_actions/redirect-to-checkout';
import { updateCouponCode } from './_actions/update-coupon-code';
import { mockLineItemAction } from './_actions/update-line-item';
import { mockShippingAction } from './_actions/update-shipping-info';
import { CartViewed } from './_components/cart-viewed';
import { getCart, getShippingCountries } from './page-data';

const mockCheckoutAction= async (lastResult:any, payload:any) => {
  const isValid = payload.get("checkout") === "true";

  if (isValid) {
    return null; // Simulate successful checkout
  }

  return {
    formErrors: ["Checkout failed. Please try again."],
  };
};


interface Props {
  params: Promise<{ locale: string }>;
}
function exists<T>(value: T | null | undefined): value is T {
  return value != null;
}




// eslint-disable-next-line complexity
export default async function Cart({ params }: Props) {
  const { locale } = await params;



  const t = "cart"
  const cartId ="cart-1"

  if (!cartId) {
    return (
      <CartEmptyState
        cta={{ label: 'Shop All', href: '/shop-all' }}
        subtitle={'Add items to your cart to get started.'}
        title={'Your cart is empty'}
      />
    );
  }

  const data = await getCart({ cartId });

  const cart = data.site.cart;
  const checkout = data.site.checkout;

  if (!cart) {
    return (
      <CartEmptyState
        cta={{ label: 'Shop All', href: '/shop-all' }}
        subtitle={'Add items to your cart to get started.'}
        title={'Your cart is empty'}
      />
    );
  }

  const lineItems = [...cart.lineItems.physicalItems, ...cart.lineItems.digitalItems];

  const formattedLineItems = lineItems.map((item) => ({
    id: item.entityId,
    quantity: item.quantity,
    price: item.listPrice.value,
    subtitle: item.selectedOptions
      .map((option) => {
        switch (option.__typename) {
          case 'CartSelectedMultipleChoiceOption':
          case 'CartSelectedCheckboxOption':
            return `${option.name}: ${option.value}`;

          case 'CartSelectedNumberFieldOption':
            return `${option.name}: ${option.number}`;

          case 'CartSelectedMultiLineTextFieldOption':
          case 'CartSelectedTextFieldOption':
            return `${option.name}: ${option.text}`;

          case 'CartSelectedDateFieldOption':
            return `${option.name}: ${new Date()}`;

          default:
            return '';
        }
      })
      .join(', '),
    title: item.name,
    image: { src: item.image?.url || '', alt: item.name },
    selectedOptions: item.selectedOptions,
    productEntityId: item.productEntityId,
    variantEntityId: item.variantEntityId,
  }));

  const totalCouponDiscount = 100;

  const shippingConsignment =
    checkout?.shippingConsignments?.find((consignment) => consignment.selectedShippingOption) ||
    checkout?.shippingConsignments?.[0];

  const shippingCountries = await getShippingCountries(data.geography);

  const countries = shippingCountries.map((country) => ({
    value: country.code,
    label: country.name,
  }));

  const statesOrProvinces = shippingCountries.map((country) => ({
    country: country.code,
    states: country.statesOrProvinces.map((state) => ({
      value: state.entityId.toString(),
      label: state.name,
    })),
  }));

  const showShippingForm =
    shippingConsignment?.address && !shippingConsignment.selectedShippingOption;

  return (
    <>
   
        <CartComponent
          cart={{
            lineItems: formattedLineItems,
            total: checkout?.grandTotal?.value || "0",
            totalLabel: 'Total',
            summaryItems: [
              {
                label: 'Subtotal',
                value: checkout?.subtotal?.value ?? "0",
              },
              
              {
                    label: 'Discounts',
                    value: "100",
              },
                
              {
                    label: 'Coupon Code',
                    value: "100"
                  }
              ,{
                label: 'Tax',
                value: checkout.taxTotal.value,
              },
            ].filter(exists),
          }}
          checkoutAction={redirectToCheckout}
          checkoutLabel={'Proceed to Checkout'}
          couponCode={{
            action: updateCouponCode,
            couponCodes: checkout?.coupons.map((coupon) => coupon.code) ?? [],
            ctaLabel: 'Apply',
            label: 'Coupon Code',
            removeLabel: 'Remove Coupon Code',
          }}
          decrementLineItemLabel={'Decrement'}
          deleteLineItemLabel={'Remove Item'}
          emptyState={{
            title: 'Your cart is empty',
            subtitle: 'Add items to your cart to get started.',
            cta: { label: 'Shop All', href: '/shop-all' },
          }}
          incrementLineItemLabel={'Increment'}
          key={`${cart.entityId}-${cart.version}`}
          lineItemAction={mockLineItemAction}
          shipping={{
            action: mockShippingAction,
            countries,
            states: statesOrProvinces,
            address: shippingConsignment?.address
              ? {
                  country: shippingConsignment.address.countryCode,
                  city:
                    shippingConsignment.address.city !== ''
                      ? (shippingConsignment.address.city ?? undefined)
                      : undefined,
                  state:
                    shippingConsignment.address.stateOrProvince !== ''
                      ? (shippingConsignment.address.stateOrProvince ?? undefined)
                      : undefined,
                  postalCode:
                    shippingConsignment.address.postalCode !== ''
                      ? (shippingConsignment.address.postalCode ?? undefined)
                      : undefined,
                }
              : undefined,
            shippingOptions: shippingConsignment?.availableShippingOptions
              ? shippingConsignment.availableShippingOptions.map((option) => ({
                  label: option.description,
                  value: option.entityId,
                  price: option.cost.value,
                }))
              : undefined,
            shippingOption: shippingConsignment?.selectedShippingOption
              ? {
                  value: shippingConsignment.selectedShippingOption.entityId,
                  label: shippingConsignment.selectedShippingOption.description,
                  price: shippingConsignment.selectedShippingOption.cost.value,
                }
              : undefined,
            showShippingForm,
            shippingLabel: 'Shipping',
            addLabel: 'Add',
            changeLabel: 'Change',
            countryLabel: 'Country',
            cityLabel: 'City',
            stateLabel: 'State',
            postalCodeLabel: 'Postal Code',
            updateShippingOptionsLabel: 'Updated Shipping Options',
            viewShippingOptionsLabel: 'View Shipping Options',
            cancelLabel: 'Cancel',
            editAddressLabel: 'Edit Address',
            shippingOptionsLabel: 'Shipping Options',
            updateShippingLabel: 'Update Shipping',
            addShippingLabel: 'Add Shipping',
            noShippingOptionsLabel: 'No Shipping Options Available',
          }}
          summaryTitle={'Order Summary'}
          title={'Your Cart'}
        />
      <CartViewed
        currencyCode={cart.currencyCode}
        lineItems={lineItems}
        subtotal={checkout?.subtotal?.value}
      />
    </>
  );
}
