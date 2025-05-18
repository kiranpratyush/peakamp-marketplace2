import { SearchParams } from 'nuqs/server';
import { FeaturedProductCarousel } from '@/design-system/sections/featured-product-carousel';
import { ProductDetail } from '@/design-system/sections/product-detail';
import { Reviews } from './_components/reviews';
import { WishlistButton } from './_components/wishlist-button';
import { WishlistButtonForm } from './_components/wishlist-button/form';
import { addToCart } from './_actions/add-to-cart';
import { Field } from '@/design-system/sections/product-detail/schema';


interface Props {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: Promise<SearchParams>;
}
const mockProduct = {
  id: "1",
  title: "Modern Chair",
  href: "/products/modern-chair",
  images: [
    { src: "https://images.unsplash.com/photo-1742837581522-111d23b69a04?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Modern Chair" },
    { src: "https://images.unsplash.com/photo-1742837581522-111d23b69a04?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Furniture" },
  ],
  price: {
    type: "sale",
    previousValue: "$150.00",
    currentValue: "$120.00",
  } as const,
  subtitle: "Comfortable and stylish chair",
  badge: "Best Seller",
  rating: 4.5,
  summary: "A modern chair that combines comfort and style.",
  description: "This chair is perfect for your living room or office. Made with high-quality materials, it offers both durability and elegance.",
  accordions: [
    {
      title: "Specifications",
      content: (
        <ul>
          <li>Dimensions: 40x40x90 cm</li>
          <li>Material: Wood and Fabric</li>
          <li>Weight: 10kg</li>
        </ul>
      ),
    },
    {
      title: "Care Instructions",
      content: (
        <p>
          Wipe with a dry cloth. Avoid direct sunlight for prolonged periods to maintain the quality of the material.
        </p>
      ),
    },
  ],
};
const sampleFields:Field[] = [
  {
    type: 'radio-group',
    name: 'color',
    label: 'Choose a color',
    options: [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
    ],
    defaultValue: 'red',
    required: true,
  },
  {
    type: 'checkbox',
    name: 'giftWrap',
    label: 'Add gift wrap',
    defaultValue: 'false',
  },
  // {
  //   type: 'number',
  //   name: 'quantity',
  //   label: 'Quantity',
  //   min: 1,
  //   max: 10,
  //   defaultValue: '1',
  //   incrementLabel: 'Increase quantity',
  //   decrementLabel: 'Decrease quantity',
  //   required: true,
  // },
  {
    type: 'text',
    name: 'customMessage',
    label: 'Custom Message',
    defaultValue: '',
    pattern: '^[a-zA-Z0-9 ]*$',
  },
  {
    type: 'textarea',
    name: 'description',
    label: 'Description',
    defaultValue: '',
    minLength: 10,
    maxLength: 200,
  },
  {
    type: 'date',
    name: 'deliveryDate',
    label: 'Preferred Delivery Date',
    defaultValue: '',
    pattern: '\\d{4}-\\d{2}-\\d{2}',
  },
  {
    type: 'swatch-radio-group',
    name: 'material',
    label: 'Choose a material',
    options: [
      { type: 'color', value: 'wood', label: 'Wood', color: '#8B4513' },
      { type: 'image', value: 'metal', label: 'Metal', image: { src: 'https://images.unsplash.com/photo-1742837581522-111d23b69a04?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Metal' } },
    ],
    defaultValue: 'wood',
  },
  {
    type: 'card-radio-group',
    name: 'size',
    label: 'Select a size',
    options: [
      { value: 'small', label: 'Small', image: { src: 'https://images.unsplash.com/photo-1742837581522-111d23b69a04?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Small size' } },
      { value: 'large', label: 'Large', image: { src: 'https://images.unsplash.com/photo-1742837581522-111d23b69a04?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Large size' } },
    ],
    defaultValue: 'small',
  },
  {
    type: 'button-radio-group',
    name: 'shipping',
    label: 'Shipping Method',
    options: [
      { value: 'standard', label: 'Standard', disabled: false },
      { value: 'express', label: 'Express', disabled: false },
    ],
    defaultValue: 'standard',
  },
  {
    type: 'select',
    name: 'country',
    label: 'Select your country',
    options: [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'United Kingdom', value: 'uk' },
    ],
    defaultValue: 'us',
  },
] as const; // Add "as const" here
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
  },]

export default async function Product(props: Props) {

  return (
    <>
        <ProductDetail
          action={addToCart}
          additionalActions={
            <WishlistButton
              formId="formId"
              productId={1}
              productSku="hello"
            />
          }
          additionalInformationTitle="Additional Information"
          ctaDisabled={true}
          ctaLabel={"Add to Cart"}
          decrementLabel="Decrease Quantity"
          emptySelectPlaceholder="Select an option"
          fields={sampleFields}
          incrementLabel="Increase Quantity"
          prefetch={true}
          product={mockProduct}
          quantityLabel="Quantity"
          thumbnailLabel="Thumbnail"
        />

      <FeaturedProductCarousel
        cta={{ label: "Shop All", href: '/shop-all' }}
        emptyStateSubtitle="Browse our catalog to find more products."
        emptyStateTitle="No Related Products Found"
        nextLabel="Next Products"
        previousLabel="Previous Products"
        products={newestProducts}
        scrollbarLabel="Scroll through products"
        title="Related Products"
      />

      <Reviews productId={1} searchParams={props.searchParams} />

      <WishlistButtonForm
        formId={"hello"}
        productId={1}
        productSku="hello"
        searchParams={props.searchParams}
      />
    </>
  );
}
