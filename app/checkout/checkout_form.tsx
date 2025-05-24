"use client";
import { Input } from "@/design-system/primitives/form/input";
import { useForm } from "react-hook-form";
import { Button } from "@/design-system/primitives/button";

type FormValues = {
  firstName: string;
  lastName: string;
  companyName: string;
  phoneNumber: string;
  streetAddress: string;
  apartmentSuite: string;
  city: string;
  country: string;
  postalcode: string;
  state: string;
};

export default function CheckoutForm() {
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const checkoutAction = (data: FormValues) => {
    console.log("checkout form is submitted", data);
  };

  return (
    <form
      className="md:w-1/2 w-full grid grid-cols-1 md:grid-cols-2 gap-4"
      noValidate
      onSubmit={handleSubmit(checkoutAction)}
    >
      <Input
        label="First Name"
        placeholder="Enter first name"
        type="text"
        id="firstName"
        {...register("firstName", {
          required: "First name is required",
        })}
        errors={
          errors.firstName?.message ? [errors.firstName.message] : undefined
        }
      />
      <Input
        label="Last Name"
        placeholder="Enter last name"
        type="text"
        id="lastName"
        {...register("lastName", {
          required: "Last name is required",
        })}
        errors={
          errors.lastName?.message ? [errors.lastName.message] : undefined
        }
      />
      <Input
        label="Company Name (Optional)"
        placeholder="Enter company name"
        type="text"
        id="companyName"
        {...register("companyName")}
        className="md:col-span-2"
      />
      <Input
        label="Phone Number (Optional)"
        placeholder="Enter phone number"
        id="phoneNumber"
        type="tel"
        {...register("phoneNumber")}
        className="md:col-span-2"
      />
      <Input
        label="Address"
        placeholder="Street address"
        type="text"
        id="streetAddress"
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
        label="Apartment/Suite/Building (Optional)"
        placeholder="E.g., Unit 12"
        type="text"
        id="apartment"
        {...register("apartmentSuite")}
        className="md:col-span-2"
      />
      <Input
        label="City"
        placeholder="City"
        type="text"
        id="city"
        {...register("city", {
          required: "City is required",
        })}
        errors={errors.city?.message ? [errors.city.message] : undefined}
      />
      <Input
        label="Country"
        placeholder="Country"
        type="text"
        id="country"
        {...register("country", {
          required: "Country is required",
        })}
        errors={errors.country?.message ? [errors.country.message] : undefined}
      />
      <Input
        label="State/Province (Optional)"
        placeholder="State or province"
        type="text"
        id="state"
        {...register("state", {
          required: "State is required",
        })}
        errors={errors.state?.message ? [errors.state.message] : undefined}
      />
      <Input
        label="Postal Code"
        placeholder="Postal code"
        type="text"
        id="postalCode"
        {...register("postalcode", {
          required: "Postal code is required",
        })}
        errors={
          errors.postalcode?.message ? [errors.postalcode.message] : undefined
        }
      />
      <Button type="submit" size="small" variant="secondary">
        Checkout
      </Button>
    </form>
  );
}
