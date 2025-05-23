import { prisma } from "@/lib/db";
import { getProductImageUrl } from "@/constants/images";

export async function getNewestProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    include: {
      category: true,
      images: {
        take: 1, // Just get the primary image
      },
    },
  });

  return products.map((product) => {
    return {
      id: product.id,
      title: product.name,
      href: `/products/${product.id}`, // You can modify if slug is used
      image: {
        src: getProductImageUrl(product.images[0]?.url),
        alt: product.images[0]?.altText ?? product.name,
      },
      price: `₹${product.averageSellPrice.toLocaleString()} per ${product.unit.toLowerCase()}`,
      subtitle: product.summary ?? "",
      badge: "Best Seller", // Placeholder until we fetch actual badge logic
      rating: product.rating ?? 0,
      unit: product.unit.toLowerCase(),
    };
  });
}
