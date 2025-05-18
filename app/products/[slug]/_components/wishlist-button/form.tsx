import { SearchParams } from 'nuqs';

import { Streamable } from '@/lib/streamable';  

import { wishlistAction } from '../../_actions/wishlist-action';
import { SearchParamsRouterRefresh } from '../search-params-router-refresh';

import { AddToNewWishlistModal } from './add-to-new-wishlist-modal';

interface Props {
  formId: string;
  productId: number;
  productSku: Streamable<string>;
  searchParams: Promise<SearchParams>;
}

// Since the wishlist button lives inside of the ProductDetailsForm, we need a separate/detached form
// to handle the actions through. The form ID is provided to the 'form' attribute of the wishlist menu items.
// The Modal also contains a form, which needs to be detached.
export const WishlistButtonForm = async ({
  formId,
  productId,
  productSku,
  searchParams,
}: Props) => {
  const modalVisible = (await searchParams).action === 'addToNewWishlist';
  const sku = await productSku;

  return (
    <>
      <SearchParamsRouterRefresh searchParamsServer={await searchParams} />
      <form action={wishlistAction} id={formId}>
        <input name="productId" type="hidden" value={productId} />
        <input name="selectedSku" type="hidden" value={sku} />
      </form>
      <AddToNewWishlistModal
        cancelLabel="Cancel"
        createLabel="Create"
        modalVisible={modalVisible}
        nameLabel="Name"
        productId={productId}
        requiredError="Name is required"
        selectedSku={sku}
        title="Create New Wishlist"
      />
    </>
  );
};
