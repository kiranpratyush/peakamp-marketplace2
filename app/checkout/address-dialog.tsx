"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormValues } from "./actions/address_action";
import AddressFormFields from "./address-form-fields";
import { Button } from "@/design-system/primitives/button";
import { useState } from "react";

interface AddressDialogProps {
  trigger: React.ReactNode;
  defaultValues?: FormValues;
  onSubmit: (
    data: FormValues
  ) => Promise<{ success: boolean; message?: string }>;
  title?: string;
  isLoading?: boolean;
}

export default function AddressDialog({
  trigger,
  defaultValues,
  onSubmit,
  title = "Save Address",
  isLoading = false,
}: AddressDialogProps) {
  const form = useForm<FormValues>({ defaultValues });
  const { handleSubmit } = form;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleFormSubmit = async (data: FormValues) => {
    setErrorMessage(null);
    try {
      const result = await onSubmit(data);
      if (!result.success) {
        setErrorMessage(
          result.message || "Something went wrong. Please try again."
        );
      } else {
        setOpen(false);
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred.");
      console.error("Submission error:", err);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed z-50 left-1/2 top-1/2 max-h-[90vh] w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-lg overflow-y-auto">
          <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </Dialog.Title>

          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <XIcon size={20} />
            </button>
          </Dialog.Close>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
          >
            <AddressFormFields
              form={form}
              isLoading={isLoading}
              showSaveCheckbox={false}
            />

            <div className="md:col-span-2 mt-6 flex justify-end gap-4">
              <Dialog.Close asChild>
                <Button variant="tertiary">Cancel</Button>
              </Dialog.Close>

              <Button type="submit" loading={isLoading}>
                Save Address
              </Button>
            </div>
          </form>
          {errorMessage && (
            <div className="md:col-span-2 text-sm text-red-600">
              {errorMessage}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
