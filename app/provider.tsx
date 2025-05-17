'use client';

import { PropsWithChildren } from 'react';

import { Toaster } from '@/design-system/primitives/toaster';
import { SearchProvider } from '@/context/search-context';

export function Providers({ children }: PropsWithChildren) {
  return (
    <SearchProvider>
      <Toaster position="top-right" />
      {children}
    </SearchProvider>
  );
}
