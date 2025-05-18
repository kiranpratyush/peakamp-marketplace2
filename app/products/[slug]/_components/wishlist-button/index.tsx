
import { cache } from 'react';

import { Streamable } from '@/lib/streamable';
import { Favorite } from '@/design-system/primitives/favorite';


import { WishlistButtonDropdown } from './dropdown';




export interface WishlistButtonWishlistInfo {
  entityId: number;
  name: string;
  wishlistItemId?: number;
}

interface WishlistButton {
  isProductInWishlist: boolean;
  wishlists: WishlistButtonWishlistInfo[];
}



interface Props {
  productId: number;
  formId: string;
  productSku?: Streamable<string>;
}
const wishlists: WishlistButtonWishlistInfo[] = [
  {
    entityId: 1,
    name: "My Favorites",
    wishlistItemId: 101,
  },
  {
    entityId: 2,
    name: "Office Furniture",
    wishlistItemId: 102,
  },
  {
    entityId: 3,
    name: "Gift Ideas",
    wishlistItemId: undefined, // No specific item in this wishlist yet
  },
];

export const WishlistButton = async ({ productId, productSku, formId }: Props) => {


  return (
    <WishlistButtonDropdown
      formId={formId}
      isLoggedIn={true}
      newWishlistLabel={'Create new wishlist'}
      wishlists={wishlists}
    >
      <Favorite checked={true} />
    </WishlistButtonDropdown>
  );
};
