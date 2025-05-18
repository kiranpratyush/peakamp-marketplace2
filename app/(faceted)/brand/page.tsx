import {  SearchParams } from 'nuqs/server';
import { ProductsListSection } from '@/design-system/sections/products-list-section';
import { Product } from '@/design-system/primitives/product-card';
import { Filter } from '@/design-system/sections/products-list-section/filters-panel';

interface Props {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
  searchParams: Promise<SearchParams>;
}
const mockProductsListData = {
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Electronics", href: "/products/electronics" }
  ],
  title: "Electronics",
  totalCount: 120,
  products:  [
    {
      id: "1",
      title: "Wireless Headphones",
      href: "/products/wireless-headphones",
      image: { 
        src: "https://images.unsplash.com/photo-1607274134639-043342705e6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxpb258ZW58MHx8MHx8fDA%3D", 
        alt: "Wireless Headphones" 
      },
      price: "$129.99",
      subtitle: "Premium Audio",
      badge: "Best Seller",
      rating: 4.7
    },
    {
      id: "2",
      title: "Smart Watch",
      href: "/products/smart-watch",
      image: { 
        src: "https://images.unsplash.com/photo-1607274134639-043342705e6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxpb258ZW58MHx8MHx8fDA%3D", 
        alt: "Smart Watch" 
      },
      price: {
        type: "sale",
        previousValue: "$249.99",
        currentValue: "$199.99"
      },
      subtitle: "Fitness Tracking",
      badge: "Sale",
      rating: 4.5
    },
    {
      id: "3",
      title: "Bluetooth Speaker",
      href: "/products/bluetooth-speaker",
      image: { 
        src: "https://images.unsplash.com/photo-1607274134639-043342705e6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxpb258ZW58MHx8MHx8fDA%3D", 
        alt: "Bluetooth Speaker" 
      },
      price: {
        type: "range",
        minValue: "$49.99",
        maxValue: "$79.99"
      },
      subtitle: "Portable Audio",
      rating: 4.2
    }
  ] as Product[],
  filters: [
    {
      type: "range",
      label: "Price",
      minParamName: "minPrice",
      maxParamName: "maxPrice",
      min: 0,
      max: 1000,
      minLabel: "Min",
      maxLabel: "Max",
      minPrepend: "$",
      maxPrepend: "$",
      minPlaceholder: "0",
      maxPlaceholder: "1000"
    },
    {
      type: "toggle-group",
      paramName: "categories",
      label: "Categories",
      options: [
        { label: "Headphones", value: "headphones" },
        { label: "Speakers", value: "speakers" },
        { label: "Smartwatches", value: "smartwatches" },
        { label: "Cameras", value: "cameras" },
        { label: "Tablets", value: "tablets" }
      ]
    },
    {
      type: "rating",
      paramName: "rating",
      label: "Rating"
    },
    {
      type: "link-group",
      label: "Popular Brands",
      links: [
        { label: "Sony", href: "/brands/sony" },
        { label: "Apple", href: "/brands/apple" },
        { label: "Samsung", href: "/brands/samsung" },
        { label: "Bose", href: "/brands/bose" }
      ]
    }
  ] as Filter[],
  sortOptions: [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "price_low_high", label: "Price: Low to High" },
    { value: "price_high_low", label: "Price: High to Low" },
    { value: "best_rated", label: "Best Rated" }
  ],
  compareProducts: [
    {
      id: "1",
      title: "Wireless Headphones",
      href: "/products/wireless-headphones",
      image: { 
        src: "https://images.unsplash.com/photo-1607274134639-043342705e6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxpb258ZW58MHx8MHx8fDA%3D", 
        alt: "Wireless Headphones" 
      },
      price: "$129.99",
      subtitle: "Premium Audio"
    },
    {
      id: "2",
      title: "Smart Watch",
      href: "/products/smart-watch",
      image: { 
        src: "https://images.unsplash.com/photo-1607274134639-043342705e6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxpb258ZW58MHx8MHx8fDA%3D", 
        alt: "Smart Watch" 
      },
      price: {
        type: "sale",
        previousValue: "$249.99",
        currentValue: "$199.99"
      },
      subtitle: "Fitness Tracking"
    }
  ] as Product[],
  paginationInfo: {
    startCursorParamName: "before",
    endCursorParamName: "after",
    hasNextPage: true,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: "cursor_123abc"
  },
  compareHref: "/compare",
  compareLabel: "Compare Selected",
  showCompare: true,
  filterLabel: "Filter Products",
  filtersPanelTitle: "Product Filters",
  resetFiltersLabel: "Reset All Filters",
  rangeFilterApplyLabel: "Apply Range",
  sortLabel: "Sort By",
  sortPlaceholder: "Select Sorting Option",
  sortParamName: "sort",
  sortDefaultValue: "featured",
  compareParamName: "compare",
  emptyStateSubtitle: "Try changing your filters or search terms.",
  emptyStateTitle: "No Products Found",
  placeholderCount: 8,
  removeLabel: "Remove",
  maxItems: 4,
  maxCompareLimitMessage: "You can only compare up to 4 products at a time."
};


export default async function Brand(props: Props) {

  return (
    <ProductsListSection
      compareLabel="Compare"
      compareProducts={mockProductsListData.compareProducts}
      emptyStateSubtitle="No products found for this brand."
      emptyStateTitle="No Products Found"
      filterLabel={undefined}
      filters={[]}
      filtersPanelTitle="Filters"
      maxCompareLimitMessage="You can compare up to 4 products at a time."
      maxItems={20}
      paginationInfo={undefined}
      products={mockProductsListData.products}
      rangeFilterApplyLabel="Apply"
      removeLabel="Remove"
      resetFiltersLabel="Reset Filters"
      showCompare={false}
      sortDefaultValue="featured"
      sortLabel="Sort By"
      sortOptions={[
        { value: 'featured', label: 'Featured Items' },
        { value: 'newest', label: 'Newest Items' },
        { value: 'best_selling', label: 'Best Selling Items' },
        { value: 'a_to_z', label: 'A to Z' },
        { value: 'z_to_a', label: 'Z to A' },
        { value: 'best_reviewed', label: 'By Review' },
        { value: 'lowest_price', label: 'Price: Low to High' },
        { value: 'highest_price', label: 'Price: High to Low' },
        { value: 'relevance', label: 'Relevance' },
      ]}
      sortParamName="sort"
      title="value"
      totalCount={mockProductsListData.totalCount}
      breadcrumbs={mockProductsListData.breadcrumbs}
    />
  );
}
