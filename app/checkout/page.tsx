"use client";

import OrderSummary from "@/design-system/sections/checkout";
import CheckoutForm from "./checkout_form";

export default function CheckoutPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      {/* Left: Order Summary */}
      <div className="md:w-1/2 w-full">
        <OrderSummary />
        <CheckoutForm />
      </div>

      {/* Right: Shipping Address Form */}
    </div>
  );
}
