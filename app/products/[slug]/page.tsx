// app/products/[slug]/page.tsx
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/design-system/sections/product-detail";
import { addToCart } from "./_actions/add-to-cart";
import { getProductImageUrl } from "@/constants/images";

interface Props {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Product({ params, searchParams }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { id: slug },
    include: {
      images: true,
      category: true,
    },
  });

  if (!product) return notFound();

  const formattedProduct = {
    id: product.id,
    title: product.name,
    href: `/products/${product.id}`,
    images: product.images.map((img) => ({
      src: getProductImageUrl(img.url),
      alt: img.altText ?? product.name,
    })),
    price: `₹${product.averageSellPrice.toLocaleString()} per ${product.unit.toLowerCase()}`,
    subtitle: product.description ?? "",
    badge: product.category.name,
    rating: product.rating ?? 0,
    summary: product.summary ?? "",
    description: product.description ?? "",
    accordions: [],
  };

  return (
    <>
      <ProductDetail
        action={addToCart}
        additionalActions={null}
        additionalInformationTitle="Additional Information"
        ctaDisabled={false}
        ctaLabel={"Add to Cart"}
        decrementLabel="Decrease Quantity"
        emptySelectPlaceholder="Select an option"
        fields={[]} // if you have dynamic options, populate here
        incrementLabel="Increase Quantity"
        prefetch={true}
        product={formattedProduct}
        quantityLabel="Quantity"
        thumbnailLabel="Thumbnail"
      />

      {/* <WishlistButtonForm
        formId={`wishlist-${product.id}`}
        productId={product.id}
        productSku={product.id}
        searchParams={searchParams}
      /> */}
    </>
  );
}
