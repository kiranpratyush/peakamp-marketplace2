'use client';

import { getFormProps, SubmissionResult, useForm } from '@conform-to/react';
import { startTransition, useActionState, useEffect } from 'react';
import { requestFormReset, useFormStatus } from 'react-dom';

import { Button } from '@/design-system/primitives/button';
import { toast } from '@/design-system/primitives/toaster';

import { WishlistItem } from '@/design-system/primitives/wishlist-item-card';

type Action<S, P> = (state: Awaited<S>, payload: P) => S | Promise<S>;

interface State {
  lastResult: SubmissionResult | null;
  successMessage?: React.ReactNode;
  errorMessage?: string;
}

export type AddWishlistItemToCartAction = Action<State, FormData>;

interface Props extends Omit<WishlistItem, 'itemId' | 'product'> {
  action: AddWishlistItemToCartAction;
}

export const WishlistItemAddToCart = ({
  callToAction = { label: 'Add to cart' },
  productId,
  variantId,
  action,
}: Props) => {
  const [{ lastResult, successMessage, errorMessage }, formAction] = useActionState(action, {
    lastResult: null,
  });

  const [form] = useForm({
    lastResult,
    onSubmit(event, { formData }) {
      event.preventDefault();

      startTransition(() => {
        requestFormReset(event.currentTarget);
        formAction(formData);
      });
    },
  });

  useEffect(() => {
    if (lastResult?.status === 'success' && successMessage) {
      toast.success(successMessage);

      // router.refresh(); // Commented out router refresh
    }

    if (lastResult?.status === 'error' && errorMessage) {
      toast.error(errorMessage);
    }
  }, [lastResult, successMessage, errorMessage]);

  return (
    <form {...getFormProps(form)} action={formAction} className="flex">
      <input name="productId" type="hidden" value={productId} />
      <input name="variantId" type="hidden" value={variantId} />
      <SubmitButton ctaLabel={callToAction.label} disabled={callToAction.disabled} />
    </form>
  );
};

function SubmitButton({ ctaLabel, disabled }: { ctaLabel: string; disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button className="flex-1" disabled={disabled} loading={pending} size="small" type="submit">
      {ctaLabel}
    </Button>
  );
}
