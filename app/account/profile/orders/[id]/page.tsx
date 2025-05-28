"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  Loader2,
  ArrowLeft,
  PackageCheck,
  Calendar,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { statusIcon, statusColor } from "../statusIcon";
import { getOrderDetailsForUser } from "../actions/getOrderDetails";
import { getProductImageUrl } from "@/constants/images";
import { useParams } from "next/navigation";

export default function OrderDetail() {
  const { user, isLoaded } = useUser();
  const [order, setOrder] = useState(null as any);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    async function fetchOrder() {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      try {
        // For now, we'll use a dummy email since we don't have real data integration
        const orders = await getOrderDetailsForUser("dummy@example.com");
        const foundOrder = orders.find((o: any) => o.id === params.id);

        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          setError("Order not found");
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError("Unable to load order details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded && user) {
      fetchOrder();
    } else if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded, user, params.id]);

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error/10 border border-error/20 rounded-lg p-4">
        <p className="text-error font-medium">{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-8">
        <div>
          <Link
            href="/account/profile/orders"
            className="flex items-center gap-1 text-sm text-primary hover:underline mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to orders
          </Link>

          <div className="bg-background rounded-xl border border-contrast-200 p-8 shadow-sm text-center">
            <p>Order not found</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate order summary
  const subtotal = order.items.reduce(
    (sum: any, item: any) =>
      sum + item.quantity * item.product.averageSellPrice,
    0
  );
  const shipping = 0; // For demonstration - in real app, get actual shipping
  const tax = subtotal * 0.07; // For demonstration - in real app, get actual tax
  const total = subtotal + shipping + tax;

  const shippingAddress = order.items[0] || {}; // Get shipping address from first item

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/account/profile/orders"
          className="flex items-center gap-1 text-sm text-info hover:underline mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to orders
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-heading font-bold">Order #{order.id}</h1>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-primary-highlight`}
          >
            {statusIcon(order.status)}
            {order.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-8 mt-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-contrast-400" />
            <span className="text-sm">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>

          {order.status === "In transit" && (
            <div className="flex items-center gap-2">
              <PackageCheck className="h-4 w-4 text-contrast-400" />
              <span className="text-sm">
                Estimated delivery:{" "}
                {new Date(
                  new Date(order.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-background rounded-xl border border-contrast-200 p-6 shadow-sm">
            <h2 className="font-medium text-lg mb-4">Items</h2>
            <div className="space-y-6">
              {order.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex flex-wrap md:flex-nowrap items-start gap-4 pb-4 border-b border-contrast-100 last:border-0 last:pb-0"
                >
                  <div className="h-20 w-20 bg-contrast-100 rounded overflow-hidden">
                    {item.product.images[0] ? (
                      <img
                        src={getProductImageUrl(item.product.images[0].url)}
                        alt={
                          item.product.images[0].altText || item.product.name
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-contrast-100">
                        <PackageCheck className="h-6 w-6 text-contrast-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-contrast-500 mt-1">
                      Condition: {item.condition || "New"}
                    </p>
                    {item.comment && (
                      <p className="text-sm text-contrast-500 mt-1">
                        Note: {item.comment}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm">Qty: {item.quantity}</p>
                      <p className="font-medium">
                        ₹
                        {(
                          item.quantity * item.product.averageSellPrice
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-background rounded-xl border border-contrast-200 p-6 shadow-sm">
            <h2 className="font-medium text-lg mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-sm text-contrast-500">Subtotal</p>
                <p className="font-medium">₹{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-contrast-500">Shipping</p>
                <p className="font-medium">₹{shipping.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-contrast-500">Tax</p>
                <p className="font-medium">₹{tax.toFixed(2)}</p>
              </div>
              <div className="border-t border-contrast-200 pt-3 mt-3">
                <div className="flex justify-between">
                  <p className="font-medium">Total</p>
                  <p className="font-medium">₹{total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-xl border border-contrast-200 p-6 shadow-sm">
            <h2 className="font-medium text-lg mb-4">Shipping Address</h2>
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-contrast-400 mt-0.5" />
              <div>
                <p className="font-medium">
                  {shippingAddress.firstName} {shippingAddress.lastName}
                </p>
                {shippingAddress.companyName && (
                  <p>{shippingAddress.companyName}</p>
                )}
                <p>{shippingAddress.streetAddress}</p>
                {shippingAddress.apartmentSuite && (
                  <p>{shippingAddress.apartmentSuite}</p>
                )}
                <p>
                  {shippingAddress.city}, {shippingAddress.state}{" "}
                  {shippingAddress.postalcode}
                </p>
                <p>{shippingAddress.country}</p>
                {shippingAddress.phoneNumber && (
                  <p className="text-sm text-contrast-500 mt-1">
                    Phone: {shippingAddress.phoneNumber}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
