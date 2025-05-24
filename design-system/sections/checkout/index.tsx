import Image from "next/image";

export default function OrderSummary() {
  const items = [
    {
      id: 1,
      title: "3 x The Planter by Rustic Roots",
      subtitle: "Color Sand",
      price: 165.0,
      image:
        "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      title: "1 x 3 Plant Bundle",
      subtitle: "Plant 1 African Fig\nPlant 2 Dracaena\nPlant 3 Palm",
      price: 342.0,
      image:
        "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      title: "1 x African Fig",
      subtitle: "",
      price: 70.0,
      image:
        "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 4,
      title: "1 x Caladium",
      subtitle: "",
      price: 28.0,
      image:
        "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-sm w-full rounded border border-gray-200 shadow-sm p-4 bg-white">
      <div className="flex justify-between items-center border-b pb-2 mb-3">
        <h2 className="font-semibold text-lg">Order Summary</h2>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Edit Cart
        </a>
      </div>

      <p className="text-sm text-gray-700 mb-4">{items.length} Items</p>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div className="h-16 w-16 relative rounded">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{item.title}</p>
              {item.subtitle && (
                <p className="text-xs text-gray-500 whitespace-pre-line">
                  {item.subtitle}
                </p>
              )}
            </div>
            <div className="text-sm font-medium text-right">
              ${item.price.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t mt-4 pt-4 space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>$0.00</span>
        </div>
        <a href="#" className="text-blue-600 text-sm hover:underline">
          Coupon/Gift Certificate
        </a>
      </div>

      <div className="border-t mt-4 pt-4 text-lg font-bold flex justify-between">
        <span>Total (USD)</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
    </div>
  );
}
