import { Slideshow } from "./_components/slideshow";
import { FeaturedProductCarousel } from "@/design-system/sections/featured-product-carousel";
import { FeaturedProductList } from "@/design-system/sections/featured-product-list";
import { getNewestProducts } from "./page-data";

// Combine the mapped products with additional products

export default async function Home() {
  const newestProducts = await getNewestProducts();

  return (
    <>
      <Slideshow />
      <FeaturedProductList
        cta={{ label: "Sell now", href: "/shop-all" }}
        description="Discover our top featured products handpicked just for you."
        emptyStateSubtitle="Try exploring other categories or check back later."
        emptyStateTitle="No Featured Products"
        products={newestProducts}
        title="Featured Products"
      />
      <FeaturedProductCarousel
        cta={{ label: "Shop New Arrivals", href: "/shop-all/?sort=newest" }}
        description="Check out our latest products hand-picked just for you."
        emptyStateSubtitle="Try adjusting your filters or check back later."
        emptyStateTitle="No products found"
        nextLabel="Next"
        previousLabel="Previous"
        products={newestProducts}
        title="Newest Products"
      />
    </>
  );
}
