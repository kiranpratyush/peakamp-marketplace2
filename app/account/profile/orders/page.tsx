"use client";

import { useUser } from "@clerk/nextjs";
import { getOrderDetailsForUser } from "./actions/getOrderDetails";
import { statusIcon, statusColor } from "./statusIcon";
import { useEffect, useState } from "react";
import { Loader2, PackageOpen, ShoppingBag } from "lucide-react";
import { getProductImageUrl } from "@/constants/images";
import Link from "next/link";

export default function OrdersList() {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      try {
        // For now, we'll use a dummy email since we don't have real data integration
        // In a real app, you'd use: user.primaryEmailAddress.emailAddress
        const orderData = await getOrderDetailsForUser("dummy@example.com");
        setOrders(orderData);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Unable to load your orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded && user) {
      fetchOrders();
    } else if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded, user]);

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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-background rounded-xl border border-contrast-200 p-8 shadow-sm text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-highlight">
              <PackageOpen className="h-8 w-8 text-primary" />
            </span>
            <h3 className="text-lg font-medium">No orders yet</h3>
            <p className="text-contrast-500 max-w-sm">
              You haven't placed any orders yet. Start shopping to see your
              orders here.
            </p>
            <Link
              href="/products/shop-all"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-primary text-white hover:bg-primary-shadow transition"
            >
              <ShoppingBag className="h-4 w-4" />
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-background rounded-xl border border-contrast-200 p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-contrast-500">Order ID</p>
                  <p className="font-medium">#{order.id}</p>
                </div>

                <div>
                  <p className="text-sm text-contrast-500">Date</p>
                  <p className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-contrast-500">Status</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(
                        order.status
                      )}`}
                    >
                      {statusIcon(order.status)}
                      {order.status}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/account/profile/orders/${order.id}`}
                  className="text-sm text-info hover:underline"
                >
                  View details
                </Link>
              </div>

              <div className="border-t border-contrast-100 pt-4">
                <p className="text-sm text-contrast-500 mb-3">Items</p>
                <div className="space-y-3">
                  {order.items.slice(0, 2).map((item: any) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-contrast-100 rounded overflow-hidden">
                        {item.product.images[0] ? (
                          <img
                            src={getProductImageUrl(item.product.images[0].url)}
                            alt={
                              item.product.images[0].altText ||
                              item.product.name
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-contrast-300" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-contrast-500">
                          Qty: {item.quantity} • $
                          {item.product.averageSellPrice.toFixed(2)}{" "}
                          {item.product.unit ? `/ ${item.product.unit}` : ""}
                        </p>
                      </div>
                    </div>
                  ))}

                  {order.items.length > 2 && (
                    <p className="text-xs text-contrast-500">
                      +{order.items.length - 2} more item
                      {order.items.length - 2 > 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
