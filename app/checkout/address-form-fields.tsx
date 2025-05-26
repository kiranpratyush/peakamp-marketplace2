// components/AddressFormFields.tsx
"use client";

import { Input } from "@/design-system/primitives/form/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./actions/address_action";

interface Props {
  form: UseFormReturn<FormValues>;
  isLoading?: boolean;
  showSaveCheckbox?: boolean;
}

export default function AddressFormFields({
  form,
  isLoading = false,
  showSaveCheckbox = true,
}: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <Input
        key="firstName"
        label="First Name"
        id="firstName"
        placeholder="Enter first name"
        type="text"
        {...register("firstName", { required: "First name is required" })}
        errors={errors.firstName?.message ? [errors.firstName.message] : undefined}
      />
      <Input
        key="lastName"
        label="Last Name"
        id="lastName"
        placeholder="Enter last name"
        type="text"
        {...register("lastName", { required: "Last name is required" })}
        errors={errors.lastName?.message ? [errors.lastName.message] : undefined}
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
        {...register("streetAddress", { required: "Street address is required" })}
        errors={errors.streetAddress?.message ? [errors.streetAddress.message] : undefined}
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
        errors={errors.country?.message ? [errors.country.message] : undefined}
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
        errors={errors.postalcode?.message ? [errors.postalcode.message] : undefined}
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

      {showSaveCheckbox && (
        <div className="md:col-span-2 mt-4">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" {...register("saveForFuture")} disabled={isLoading} />
            <span>Save this address for future use</span>
          </label>
        </div>
      )}
    </>
  );
}
