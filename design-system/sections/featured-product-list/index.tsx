import { Streamable } from '@/lib/streamable';
import { ButtonLink } from '@/design-system/primitives/button-link';
import { Product } from '@/design-system/primitives/product-card';
import { ProductList } from '@/design-system/sections/product-list';
import { StickySidebarLayout } from '@/design-system/sections/sticky-sidebar-layout';

interface Link {
  label: string;
  href: string;
}

export interface FeaturedProductsListProps {
  title: string;
  description?: string;
  cta?: Link;
  products: Streamable<Product[]>;
  emptyStateTitle?: Streamable<string>;
  emptyStateSubtitle?: Streamable<string>;
  placeholderCount?: number;
}

// eslint-disable-next-line valid-jsdoc
/**
 * This component supports various CSS variables for theming. Here's a comprehensive list, along
 * with their default values:
 *
 * ```css
 * :root {
 *   --featured-product-list-font-family: var(--font-family-body);
 *   --featured-product-list-title-font-family: var(--font-family-heading);
 *   --featured-product-list-title: hsl(var(--foreground));
 *   --featured-product-list-description: hsl(var(--contrast-500));
 * }
 * ```
 */
export function FeaturedProductList({
  title,
  description,
  cta,
  products,
  emptyStateTitle,
  emptyStateSubtitle,
  placeholderCount,
}: FeaturedProductsListProps) {
  return (
    <StickySidebarLayout
      sidebar={
        <header className="font-[family-name:var(--featured-product-list-font-family,var(--font-family-body))]">
          <h2 className="mb-3 font-[family-name:var(--featured-product-list-title-font-family,var(--font-family-heading))] text-4xl leading-none font-medium text-[var(--featured-product-list-title,hsl(var(--foreground)))] @4xl:text-5xl">
            {title}
          </h2>
          {description != null && description !== '' && (
            <p className="mb-8 max-w-xl text-lg leading-normal text-[var(--featured-product-list-description,hsl(var(--contrast-500)))]">
              {description}
            </p>
          )}

          {cta?.href != null && cta.href !== '' && cta.label !== '' && (
            <ButtonLink href={cta.href} variant="secondary">
              {cta.label}
            </ButtonLink>
          )}
        </header>
      }
      sidebarSize="1/3"
    >
      <div className="group/product-list flex-1">
        <ProductList
          emptyStateSubtitle={emptyStateSubtitle}
          emptyStateTitle={emptyStateTitle}
          placeholderCount={placeholderCount}
          products={products}
          showCompare={false}
        />
      </div>
    </StickySidebarLayout>
  );
}
