import { Slideshow } from "./_components/slideshow";
import { FeaturedProductCarousel } from "@/design-system/sections/featured-product-carousel";
import { FeaturedProductList } from "@/design-system/sections/featured-product-list";


const newestProducts = [
  {
    id: '1',
    title: 'Modern Minimal Chair',
    href: '/products/minimal-chair',
    image: {
      src: 'https://images.unsplash.com/photo-1746061641843-400d30a49079?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Minimal wooden chair with cushion',
    },
    price: '129.99', // Regular price
    subtitle: 'Furniture',
    badge: 'New',
    rating: 4.5,
  },
  {
    id: '2',
    title: 'Stylish Ceramic Vase',
    href: '/products/ceramic-vase',
    image: {
      src: 'https://images.unsplash.com/photo-1742837581522-111d23b69a04?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'White ceramic vase on wooden table',
    },
    price: {
      type: 'range',
      minValue: '39.00',
      maxValue: '59.00',
    } as const,
    subtitle: 'Decor',
    badge: 'Trending',
    rating: 4.7,
  },
  {
    id: '3',
    title: 'Smart LED Lamp',
    href: '/products/smart-lamp',
    image: {
      src: 'https://images.unsplash.com/photo-1742837581522-111d23b69a04?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Modern desk lamp with smart light features',
    },
    price: {
      type: 'sale',
      previousValue: '119.99',
      currentValue: '89.99',
    } as const,
    subtitle: 'Lighting',
    badge: 'Bestseller',
    rating: 4.8,
  },
  {
    id: '4',
    title: 'Artisan Coffee Mug',
    href: '/products/coffee-mug',
    image: {
      src: 'https://images.unsplash.com/photo-1726137569914-ae2ad1c634f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Handmade ceramic coffee mug',
    },
    price: '25.50',
    subtitle: 'Kitchenware',
    badge: 'Eco-friendly',
    rating: 4.3,
  },
  {
    id: '5',
    title: 'Artisan Coffee Mug',
    href: '/products/coffee-mug',
    image: {
      src: 'https://images.unsplash.com/photo-1726137569914-ae2ad1c634f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Handmade ceramic coffee mug',
    },
    price: '25.50',
    subtitle: 'Kitchenware',
    badge: 'Eco-friendly',
    rating: 4.3,
  },
];


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
