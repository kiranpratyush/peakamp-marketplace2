import {
  Cart as CartComponent,
  CartEmptyState,
} from "@/design-system/sections/cart";
import { redirectToCheckout } from "./_actions/redirect-to-checkout";
import { mockLineItemAction } from "./_actions/update-line-item";
import { prisma } from "@/lib/db";
import { getProductImageUrl } from "@/constants/images";

const mockCheckoutAction = async (lastResult: any, payload: any) => {
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
  const userEmail = "dummy@example.com";
  const dbUser = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {
      Cart: {
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: true,
                },
              },
            },
          },
        },
      },
    },
  });
  const cart = dbUser?.Cart;
  if (!cart || cart.items.length == 0) {
    return (
      <CartEmptyState
        cta={{ label: "Shop All", href: "/shop-all" }}
        subtitle={"Add items to your cart to get started."}
        title={"Your cart is empty"}
      />
    );
  }
  const formattedLineItems = cart.items.map((item) => ({
    id: item.id,
    title: item.product.name,
    subtitle: item.product.summary || "",
    quantity: item.quantity,
    price: `₹${item.product.averageSellPrice} per ${item.product.unit}`,
    image: {
      src: getProductImageUrl(item.product.images[0].url),
      alt: item.product.name,
    },
    total: item.quantity * item.product.averageSellPrice,
  }));
  const subtotal = formattedLineItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  return (
    <>
      <CartComponent
        cart={{
          lineItems: formattedLineItems,
          total: `₹${subtotal}`,
          totalLabel: "Total",
          summaryItems: [
            { label: "Subtotal", value: `₹${subtotal.toFixed(2)}` },
            { label: "Discounts", value: "0" },
            { label: "Tax", value: "0" },
          ],
        }}
        checkoutAction={redirectToCheckout}
        checkoutLabel={"Proceed to Sell"}
        couponCode={undefined}
        decrementLineItemLabel={"Decrement"}
        deleteLineItemLabel={"Remove Item"}
        emptyState={{
          title: "Your cart is empty",
          subtitle: "Add items to your cart to get started.",
          cta: { label: "Shop All", href: "/shop-all" },
        }}
        incrementLineItemLabel={"Increment"}
        key={`${cart.id}`}
        lineItemAction={mockLineItemAction}
        shipping={undefined}
        summaryTitle={"Order Summary"}
        title={"Your Cart"}
      />
    </>
  );
}
