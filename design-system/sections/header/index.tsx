'use client';

import { HeaderSection } from '@/design-system/sections/header-section';
import { Streamable } from '@/lib/streamable';
export const mockSearchAction = async (
  prevState:any,
  payload:any,
) => {
  const query = payload.get('query')?.toString().trim().toLowerCase() ?? '';

  if (!query) {
    return {
      ...prevState,
      lastResult: {
        status: 'error',
        error: { query: ['Query is required'] },
        fields: ['query'],
      },
      searchResults: [],
      emptyStateTitle: 'No query provided',
      emptyStateSubtitle: 'Please enter a search term.',
    };
  }

  // Simulate mock products for certain keywords
  const mockProducts = query === 'shirt'
    ? [{
        type: 'products',
        title: 'Products matching "shirt"',
        products: [
          {
            id: '1',
            title: 'Blue Shirt',
            href: '/products/1',
            price: { type: 'sale', previousValue: '₹1200', currentValue: '₹800' },
            image: { src: 'https://via.placeholder.com/150', alt: 'Blue Shirt' },
          },
        ],
      }]
    : [{
        type: 'links',
        title: 'Quick Links',
        links: [
          { label: 'Search Help', href: '/help/search' },
          { label: 'Contact Support', href: '/contact' },
        ],
      }];

  return {
    searchResults: mockProducts,
    lastResult: { status: 'success' },
    emptyStateTitle: `No results found for "${query}"`,
    emptyStateSubtitle: 'Try adjusting your search terms.',
  };
};





// Mock currency switch action
const switchCurrency = async (_state: any, payload: FormData) => {
  const currency = payload.get('id');
  console.log('Currency switched to:', currency);
  return _state;
};

// Mock navigation links (top-level + grouped)
const mockLinks = Streamable.from(async () => [
  {
    label: 'Home',
    href: '/',
    groups: [],
  },
  {
    label: 'Catalog',
    href: '/products',
    groups: [
      {
        label: 'Men',
        href: '/products/men',
        links: [
          { label: 'Shirts', href: '/products/men/shirts' },
          { label: 'Shoes', href: '/products/men/shoes' },
        ],
      },
      {
        label: 'Women',
        href: '/products/women',
        links: [
          { label: 'Dresses', href: '/products/women/dresses' },
          { label: 'Heels', href: '/products/women/heels' },
        ],
      },
    ],
  },
]);

// Mock cart count
const mockCartCount = Streamable.from(async () => 3);

// Mock active currency
const mockActiveCurrencyId = Streamable.from(async () => 'USD');

// Mock locales
const locales = [
  { id: 'en', label: 'EN' },
  { id: 'fr', label: 'FR' },
];

// Mock currencies
const currencies = [
  { id: 'USD', label: 'USD', isDefault: true },
  { id: 'EUR', label: 'EUR', isDefault: false },
];

// Mock logo
const logo = {
  src: 'https://images.unsplash.com/photo-1735825764445-af30f44dc49f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  alt: 'Site Logo',
};

export const Header = () => {
  return (
    <HeaderSection
      navigation={{
        accountHref: '/login',
        accountLabel: 'Profile',
        cartHref: '/cart',
        cartLabel: 'Cart',
        searchHref: '/search',
        searchParamName: 'term',
        searchAction: mockSearchAction,
        links: mockLinks,
        logo:"Peak AMP",
        mobileMenuTriggerLabel: 'Menu',
        openSearchPopupLabel: 'Search',
        logoLabel: 'Home',
        cartCount: mockCartCount,
        activeLocaleId: 'en',
        locales: locales,
        currencies: currencies,
        activeCurrencyId: mockActiveCurrencyId,
        currencyAction: switchCurrency,
      }}
    />
  );
};
