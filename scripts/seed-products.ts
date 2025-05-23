import { prisma } from "@/lib/db";
import { PRODUCT_IMAGES } from "@/constants/images";
const mockProducts = [
  {
    title: "NMC Black Mass",
    image: PRODUCT_IMAGES.NMC,
    price: "₹28,500 per kg",
    subtitle:
      "High-quality NMC black mass with optimal composition for battery manufacturing.",
    badge: "Best Seller",
    rating: 4.7,
    unit: "KG",
    category: "BLACK MASS",
  },
  {
    title: "LFP Black Mass",
    image: PRODUCT_IMAGES.ALUMINIUM,
    price: "₹22,000",
    subtitle:
      "Premium LFP black mass with consistent quality and high recovery rates.",
    badge: "Sale",
    rating: 4.5,
    unit: "KG",
    category: "BLACK MASS",
  },
  {
    title: "LFP Black Mass",
    image: PRODUCT_IMAGES.LFP,
    price: "₹22,000",
    subtitle:
      "Premium LFP black mass with consistent quality and high recovery rates.",
    badge: "Sale",
    rating: 4.5,
    unit: "KG",
    category: "BLACK MASS",
  },
  {
    title: "LFP Black Mass",
    image: PRODUCT_IMAGES.COPPER,
    price: "₹22,000",
    subtitle:
      "Premium LFP black mass with consistent quality and high recovery rates.",
    badge: "Sale",
    rating: 4.5,
    unit: "KG",
    category: "BLACK MASS",
  },
  {
    title: "LFP Black Mass",
    image: PRODUCT_IMAGES.LCO,
    price: "₹22,000",
    subtitle:
      "Premium LFP black mass with consistent quality and high recovery rates.",
    badge: "Sale",
    rating: 4.5,
    unit: "KG",
    category: "BLACK MASS",
  },
];
async function main() {
  for (const product of mockProducts) {
    const priceMatch = product.price.match(/₹([\d,]+)/);
    const numericPrice = priceMatch
      ? parseFloat(priceMatch[1].replace(/,/g, ""))
      : 0;

    // Upsert the category first
    const category = await prisma.category.upsert({
      where: { name: product.category },
      update: {},
      create: { name: product.category },
    });

    const createdProduct = await prisma.product.create({
      data: {
        name: product.title,
        description: product.subtitle,
        averageSellPrice: numericPrice,
        unit: product.unit.toUpperCase() as any,
        availableQuantity: 10,
        rating: product.rating,
        categoryId: category.id,
      },
    });

    const imageFileName = product.image.split("/").pop();

    await prisma.productImage.create({
      data: {
        productId: createdProduct.id,
        url: imageFileName || "",
        altText: product.title,
      },
    });

    console.log(`✅ Created product: ${product.title}`);
  }
}

main()
  .catch((e) => {
    console.error("❌ Error seeding products", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
