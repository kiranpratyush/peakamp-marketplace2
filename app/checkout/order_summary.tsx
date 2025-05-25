import Image from "next/image";
import { prisma } from "@/lib/db";
import { getProductImageUrl } from "@/constants/images";

export default async function OrderSummary() {
  const user = await prisma.user.findUnique({
    where: { email: "dummy@example.com" },
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

  if (!user?.Cart?.items.length) {
    return (
      <div className="p-4 rounded border border-gray-300 bg-white shadow">
        <p>No items found in cart for dummy@email.com</p>
      </div>
    );
  }

  const items = user.Cart.items.map((item: any) => ({
    id: item.id,
    title: `${item.product.name} (${item.quantity} ${item.product.unit})`,
    subtitle: item.product.summary ?? "",
    price: `₹${item.product.averageSellPrice * item.quantity}`,
    rawprice: item.product.averageSellPrice * item.quantity,
    image: getProductImageUrl(item.product.images[0]?.url),
  }));

  const subtotal = `₹${items
    .reduce((sum: any, item: any) => sum + item.rawprice, 0)
    .toFixed(2)}`;

  return (
    <div className="max-w-sm w-full rounded border border-[hsl(var(--contrast-200))] shadow-md p-4 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="flex justify-between items-center border-b border-[hsl(var(--contrast-100))] pb-2 mb-3">
        <h2 className="font-semibold text-lg font-[var(--font-family-heading)]">
          Order Summary
        </h2>
        <a
          href="/cart"
          className="text-sm text-[color-mix(in_oklab,_hsl(var(--primary)),_black_60%)] hover:underline"
        >
          Edit Cart
        </a>
      </div>

      <p className="text-sm text-[hsl(var(--contrast-500))] mb-4">
        {items.length} Items
      </p>

      <div className="space-y-4">
        {items.map((item: any) => (
          <div key={item.id} className="flex items-start gap-3">
            <div className="h-16 w-16 relative rounded overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-[var(--font-family-body)]">
                {item.title}
              </p>
              {item.subtitle && (
                <p className="text-xs text-[hsl(var(--contrast-400))] whitespace-pre-line">
                  {item.subtitle}
                </p>
              )}
            </div>
            <div className="text-sm font-medium text-right text-[hsl(var(--foreground))]">
              {item.price}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[hsl(var(--contrast-100))] mt-4 pt-4 space-y-1 text-sm text-[hsl(var(--foreground))]">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{subtotal}</span>
        </div>
      </div>

      <div className="border-t border-[hsl(var(--contrast-100))] mt-4 pt-4 text-lg font-bold flex justify-between text-[hsl(var(--foreground))]">
        <span>Total (INR)</span>
        <span>{subtotal}</span>
      </div>
    </div>
  );
}
