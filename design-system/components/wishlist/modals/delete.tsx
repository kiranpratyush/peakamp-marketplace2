'use client';

import { FormStatus } from '@/design-system/primitives/form/form-status';
import { Wishlist } from '@/design-system/sections/wishlist-details';
import { useModalForm } from '@/design-system/sections/modal/modal-form-provider';

import { deleteWishlistSchema } from '../schema';

export const DeleteWishlistModal = ({ id, message }: Wishlist & { message: React.ReactNode }) => {
  const { state, form } = useModalForm(deleteWishlistSchema);

  return (
    <>
      {message}
      <input name="wishlistId" type="hidden" value={id} />
      {state.lastResult?.status === 'error' && (
        <div className="mt-4">
          {form.errors?.map((error, index) => (
            <FormStatus key={index} type="error">
              {error}
            </FormStatus>
          ))}
        </div>
      )}
    </>
  );
};
