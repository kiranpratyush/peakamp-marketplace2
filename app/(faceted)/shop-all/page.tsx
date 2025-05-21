import {  SearchParams } from 'nuqs/server';
import { ProductsListSection } from '@/design-system/sections/products-list-section';
import { Product } from '@/design-system/primitives/product-card';
import { Filter } from '@/design-system/sections/products-list-section/filters-panel';
import { PRODUCT_IMAGES } from '@/constants/images';
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
  totalCount: 5,
  products:  [
    {
      id: "1",
      title: "NMC Black Mass",
      href: "/products/wireless-headphones",
      image: { 
        src: PRODUCT_IMAGES.NMC, 
        alt: "NMC Black Mass" 
      },
      price: "₹28,500 per kg",
      subtitle: "High-quality NMC black mass with optimal composition for battery manufacturing.",
      badge: "Best Seller",
      rating: 4.7,
      unit: "kg",
    },
    {
      id: "2",
      title: "LFP Black Mass",
      href: "/products/smart-watch",
      image: { 
        src: PRODUCT_IMAGES.ALUMINIUM, 
        alt: "LFP Black Mass" 
      },
      price: "₹22,000",
      subtitle: "Premium LFP black mass with consistent quality and high recovery rates.",
      badge: "Sale",
      rating: 4.5
    },
    {
      id: "3",
      title: "LFP Black Mass",
      href: "/products/smart-watch",
      image: { 
        src: PRODUCT_IMAGES.LFP, 
        alt: "LFP Black Mass" 
      },
      price: "₹22,000",
      subtitle: "Premium LFP black mass with consistent quality and high recovery rates.",
      badge: "Sale",
      rating: 4.5
    },
    {
      id: "4",
      title: "LFP Black Mass",
      href: "/products/smart-watch",
      image: { 
        src: PRODUCT_IMAGES.COPPER, 
        alt: "LFP Black Mass" 
      },
      price: "₹22,000",
      subtitle: "Premium LFP black mass with consistent quality and high recovery rates.",
      badge: "Sale",
      rating: 4.5
    },
    {
      id: "5",
      title: "LFP Black Mass",
      href: "/products/smart-watch",
      image: { 
        src: PRODUCT_IMAGES.LCO, 
        alt: "LFP Black Mass" 
      },
      price: "₹22,000",
      subtitle: "Premium LFP black mass with consistent quality and high recovery rates.",
      badge: "Sale",
      rating: 4.5
    },
  ] as Product[],
  filters: [
    {
      type: "toggle-group",
      paramName: "categories",
      label: "Categories",
      options: [
        { label: "BLACK MASS", value: "black_mass" },
        { label: "METAL", value: "metal" },
        { label: "NON METAL", value: "non_metal" },
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
      compareProducts={undefined}
      emptyStateSubtitle="No products found for this brand."
      emptyStateTitle="No Products Found"
      filterLabel={undefined}
      filters={mockProductsListData.filters}
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
      sortLabel={undefined}
      sortOptions={[
      ]}
      sortParamName={undefined}
      title="All Products"
      totalCount={mockProductsListData.totalCount}
      breadcrumbs={undefined}
  
    />
  );
}
