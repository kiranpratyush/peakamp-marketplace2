import { SearchParams } from "nuqs/server";
import { ProductsListSection } from "@/design-system/sections/products-list-section";
import { Product } from "@/design-system/primitives/product-card";
import { Filter } from "@/design-system/sections/products-list-section/filters-panel";
import { PRODUCT_IMAGES } from "@/constants/images";
import { fetchProducts, fetchCategoryFilters } from "./page-data";
interface Props {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
  searchParams: Promise<SearchParams>;
}

export default async function Brand(props: Props) {
  //
  const products = await fetchProducts();
  const filters = await fetchCategoryFilters();
  return (
    <ProductsListSection
      compareLabel="Compare"
      compareProducts={undefined}
      emptyStateSubtitle="No products found."
      emptyStateTitle="No Products Found"
      filterLabel={undefined}
      filters={filters}
      filtersPanelTitle="Filters"
      maxCompareLimitMessage="You can compare up to 4 products at a time."
      maxItems={undefined}
      paginationInfo={undefined}
      products={products}
      rangeFilterApplyLabel="Apply"
      removeLabel="Remove"
      resetFiltersLabel="Reset Filters"
      showCompare={false}
      sortDefaultValue="featured"
      sortLabel={undefined}
      sortOptions={[]}
      sortParamName={undefined}
      title="All Products"
      totalCount={products.length}
      breadcrumbs={undefined}
    />
  );
}
