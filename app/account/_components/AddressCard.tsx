// app/address/AddressCard.tsx
"use client";

import { PencilIcon } from "lucide-react";
import AddressDialog from "@/app/checkout/address-dialog";
import { FormValues } from "@/app/checkout/actions/address_action";

interface Props {
  address: {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    postalcode: string;
  };
}

export function AddressCard({ address }: Props) {
  const handleAddressSave = async (data: FormValues) => {
    console.log("Saved!", data);
    // Call update API here
  };

  return (
    <div className="relative border border-gray-200 rounded-lg p-5 shadow-sm bg hover:shadow-md transition ">
      <AddressDialog
        trigger={
          <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
            <PencilIcon size={16} /> Edit
          </button>
        }
        defaultValues={address}
        onSubmit={handleAddressSave}
        title="Edit Address"
      />

      <div className="text-sm text-gray-800 space-y-1">
        <div className="font-semibold">{address.name}</div>
        <div>
          {address.firstName} {address.lastName}
        </div>
        <div>{address.streetAddress}</div>
        <div>
          {address.city}, {address.state} {address.postalcode}
        </div>
        <div>{address.country}</div>
        <div className="text-gray-600">Phone: {address.phoneNumber}</div>
      </div>
    </div>
  );
}
