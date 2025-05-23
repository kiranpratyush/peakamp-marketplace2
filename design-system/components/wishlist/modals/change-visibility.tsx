'use client';

import { FormStatus } from '@/design-system/primitives/form/form-status';
import { Wishlist } from '@/design-system/sections/wishlist-details';
import { useModalForm } from '@/design-system/sections/modal/modal-form-provider';

import { toggleWishlistVisibilitySchema } from '../schema';

export const ChangeWishlistVisibilityModal = ({
  id,
  visibility: { isPublic },
  message,
}: Wishlist & { message: React.ReactNode }) => {
  const { state, form } = useModalForm(toggleWishlistVisibilitySchema);

  return (
    <>
      {message}
      <input name="wishlistId" type="hidden" value={id} />
      <input name="wishlistIsPublic" type="hidden" value={String(!isPublic)} />
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
