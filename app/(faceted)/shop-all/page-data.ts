import { PrismaClient } from "@prisma/client";
import { Filter } from "@/design-system/sections/products-list-section/filters-panel";
import { getProductImageUrl } from "@/constants/images";

const prisma = new PrismaClient();

export async function fetchProducts() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      images: {
        take: 1, // Just get the primary image
      },
    },
  });

  return products.map((product) => ({
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
  }));
}

function normalizeToValue(label: string): string {
  return label.trim().toLowerCase().replace(/\s+/g, "_");
}

export async function fetchCategoryFilters(): Promise<Filter[]> {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
    },
  });

  const filter: Filter = {
    type: "toggle-group",
    paramName: "categories",
    label: "Categories",
    options: categories.map((category) => ({
      label: category.name,
      value: normalizeToValue(category.name),
    })),
  };

  return [filter];
}
