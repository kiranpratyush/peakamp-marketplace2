"use client";
import { VisuallyHidden } from "radix-ui";
import { Input } from "@/design-system/primitives/form/input";
import { Button } from "@/design-system/primitives/button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import {
  createAddressForUser,
  getAddressesForUser,
  FormValues,
} from "./actions/address_action";
import { checkoutActionForUser } from "./actions/checkout_action";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const form = useForm<FormValues>();
  const { register, handleSubmit, setValue, formState } = form;
  const { errors } = formState;
  const [addresses, setAddresses] = useState<FormValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [submittedAddress, setSubmittedAddress] = useState<FormValues | null>(
    null
  );
  const router = useRouter();
  const userEmail = "dummy@example.com";

  useEffect(() => {
    const loadAddresses = async () => {
      const result = await getAddressesForUser();
      setAddresses(result);
    };
    loadAddresses();
  }, []);

  const onAddressSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const address = addresses.find((a) => a.id === selectedId);
    if (address) {
      const keys = Object.keys(form.getValues()) as (keyof FormValues)[];
      for (const key of keys) {
        const value = address[key];
        setValue(key, value ?? undefined);
      }
    }
  };

  const checkoutAction = async (data: FormValues) => {
    setIsLoading(true);
    try {
      if (data.saveForFuture) {
        const result = await createAddressForUser(data);
        if (result.formValues) {
          setAddresses([...addresses, result.formValues]);
        }

        if (!result.success) {
          console.error("Failed to save address:", result.error);
          return;
        }
      }

      const orderResult = await checkoutActionForUser(data, userEmail);
      if (!orderResult.success) {
        console.error("Order creation failed");
        return;
      }

      console.log("Order created successfully:", orderResult.orderId);
      setOrderId(orderResult.orderId);
      setSubmittedAddress(data); // Save for modal display
      setShowConfirmation(true);
    } catch (err) {
      console.error("Checkout failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-[hsl(var(--background))] text-[hsl(var(--foreground))] rounded-sm shadow-md border-t-1 border-[hsl(var(--contrast-300))]">
      <h1 className="mb-10 text-4xl font-medium leading-none font-[var(--font-family-heading)] @xl:text-5xl">
        Shipping
      </h1>

      {addresses.length > 0 && (
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">
            Select Saved Address
          </label>
          <select
            onChange={onAddressSelect}
            className="w-full p-2 border rounded"
            defaultValue=""
            disabled={isLoading}
          >
            <option value="" disabled>
              Choose an address
            </option>
            {addresses.map((addr) => (
              <option key={addr.id} value={addr.id}>
                {addr.name} – {addr.streetAddress}
              </option>
            ))}
          </select>
        </div>
      )}

      <form
        noValidate
        onSubmit={handleSubmit(checkoutAction)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Input
          key="firstName"
          label="First Name"
          id="firstName"
          placeholder="Enter first name"
          type="text"
          {...register("firstName", { required: "First name is required" })}
          errors={
            errors.firstName?.message ? [errors.firstName.message] : undefined
          }
        />
        <Input
          key="lastName"
          label="Last Name"
          id="lastName"
          placeholder="Enter last name"
          type="text"
          {...register("lastName", { required: "Last name is required" })}
          errors={
            errors.lastName?.message ? [errors.lastName.message] : undefined
          }
        />
        <Input
          key="companyName"
          label="Company Name (Optional)"
          id="companyName"
          placeholder="Company"
          type="text"
          {...register("companyName")}
          className="md:col-span-2"
        />
        <Input
          key="phoneNumber"
          label="Phone Number (Optional)"
          id="phoneNumber"
          placeholder="Phone"
          type="tel"
          {...register("phoneNumber")}
          className="md:col-span-2"
        />
        <Input
          key="streetAddress"
          label="Street Address"
          id="streetAddress"
          placeholder="123 Main St"
          type="text"
          {...register("streetAddress", {
            required: "Street address is required",
          })}
          errors={
            errors.streetAddress?.message
              ? [errors.streetAddress.message]
              : undefined
          }
          className="md:col-span-2"
        />
        <Input
          key="apartmentSuite"
          label="Apartment/Suite (Optional)"
          id="apartmentSuite"
          placeholder="Unit, Floor"
          type="text"
          {...register("apartmentSuite")}
          className="md:col-span-2"
        />
        <Input
          key="city"
          label="City"
          id="city"
          placeholder="City"
          type="text"
          {...register("city", { required: "City is required" })}
          errors={errors.city?.message ? [errors.city.message] : undefined}
        />
        <Input
          key="country"
          label="Country"
          id="country"
          placeholder="Country"
          type="text"
          {...register("country", { required: "Country is required" })}
          errors={
            errors.country?.message ? [errors.country.message] : undefined
          }
        />
        <Input
          key="state"
          label="State/Province"
          id="state"
          placeholder="State"
          type="text"
          {...register("state", { required: "State is required" })}
          errors={errors.state?.message ? [errors.state.message] : undefined}
        />
        <Input
          key="postalcode"
          label="Postal Code"
          id="postalcode"
          placeholder="Postal code"
          type="text"
          {...register("postalcode", { required: "Postal code is required" })}
          errors={
            errors.postalcode?.message ? [errors.postalcode.message] : undefined
          }
        />
        <Input
          key="name"
          label="Address Type (e.g., Home, Work)"
          id="name"
          placeholder="e.g. Home"
          type="text"
          {...register("name", { required: "Address type is required" })}
          errors={errors.name?.message ? [errors.name.message] : undefined}
          className="md:col-span-2"
        />

        <div className="md:col-span-2 mt-4">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" {...register("saveForFuture")} />
            <span>Save this address for future use</span>
          </label>
        </div>

        <div className="md:col-span-2 border-t-2 border-[hsl(var(--contrast-300))] pt-6 mt-6 flex justify-center">
          <Button
            type="submit"
            size="small"
            variant="secondary"
            loading={isLoading}
            disabled={isLoading}
            className="min-w-[200px]"
          >
            Place Sell Request
          </Button>
        </div>
      </form>

      <Dialog.Root open={showConfirmation} onOpenChange={setShowConfirmation}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed z-50 left-1/2 top-1/2 max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white dark:bg-gray-900 p-6 shadow-lg overflow-y-auto">
            <VisuallyHidden.Root>
              <Dialog.Title>Order Confirmation</Dialog.Title>
            </VisuallyHidden.Root>

            <Dialog.Close className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <XIcon size={20} />
            </Dialog.Close>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
              Thanks for your Sell Request !
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
              Your request{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                #{orderId}
              </span>{" "}
              has been submitted and will be processed within 24 hours.
            </p>

            {submittedAddress && (
              <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
                <dl className="sm:grid sm:grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <dt className="text-gray-500 dark:text-gray-400">Name</dt>
                    <dd className="text-gray-900 dark:text-white">
                      {submittedAddress.firstName} {submittedAddress.lastName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 dark:text-gray-400">Phone</dt>
                    <dd className="text-gray-900 dark:text-white">
                      {submittedAddress.phoneNumber || "N/A"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 dark:text-gray-400">
                      Address
                    </dt>
                    <dd className="text-gray-900 dark:text-white">
                      {submittedAddress.streetAddress}
                      {submittedAddress.apartmentSuite && (
                        <>,&nbsp;{submittedAddress.apartmentSuite}</>
                      )}
                      <br />
                      {submittedAddress.city}, {submittedAddress.state},{" "}
                      {submittedAddress.postalcode}, {submittedAddress.country}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 dark:text-gray-400">
                      Address Type
                    </dt>
                    <dd className="text-gray-900 dark:text-white">
                      {submittedAddress.name}
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            <div className="flex items-center space-x-4 justify-end">
              <Dialog.Close asChild>
                <button
                  onClick={() => router.push("/shop-all")}
                  className="py-2.5 px-5 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800"
                >
                  Return to shopping
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
