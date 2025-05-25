import { StickySidebarLayout } from "@/design-system/sections/sticky-sidebar-layout";

import OrderSummary from "./order_summary";
import CheckoutForm from "./checkout_form";

export default function CheckoutPage() {
  return (
    <StickySidebarLayout
      sidebar={<OrderSummary />}
      sidebarPosition="after" // Optional: place summary on right side
      sidebarSize="1/3" // Optional: sets width of sidebar
      containerSize="2xl" // Optional: layout width
    >
      <CheckoutForm />
    </StickySidebarLayout>
  );
}
