import { Slideshow } from "./_components/slideshow";
import { FeaturedProductCarousel } from "@/design-system/sections/featured-product-carousel";
import { FeaturedProductList } from "@/design-system/sections/featured-product-list";
import { mockproducts } from "@/constants/test-data";

type ProductPrice = string | {
  type: 'range';
  minValue: string;
  maxValue: string;
} | {
  type: 'sale';
  previousValue: string;
  currentValue: string;
};

interface Product {
  id: string;
  title: string;
  href: string;
  image: {
    src: string;
    alt: string;
  };
  price: ProductPrice;
  subtitle: string;
  badge?: string;
  rating?: number;
}

// Map over mockproducts to create uniform product objects
const mappedProducts: Product[] = mockproducts.map(product => ({
  id: product.id,
  title: product.name,
  href: `/products/${product.id}`,
  image: {
    src: product.image,
    alt: product.name,
  },
  price: `${product.price} ${product.unit}`,
  subtitle: product.description,
  badge: product.category,
  rating: product.ratings,
}));



// Combine the mapped products with additional products
const newestProducts = [...mappedProducts];

export default function Home() {
  return (
    <>
      <Slideshow />
      <FeaturedProductList
        cta={{ label: 'Shop Now', href: '/shop-all' }}
        description="Discover our top featured products handpicked just for you."
        emptyStateSubtitle="Try exploring other categories or check back later."
        emptyStateTitle="No Featured Products"
        products={newestProducts}
        title="Featured Products"
      />
      <FeaturedProductCarousel
        cta={{ label: 'Shop New Arrivals', href: '/shop-all/?sort=newest' }}
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
