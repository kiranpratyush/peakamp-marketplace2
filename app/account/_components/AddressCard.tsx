// app/address/AddressCard.tsx
"use client";

import { PencilIcon } from "lucide-react";

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
  return (
    <div className="relative border border-gray-200 rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition">
      <button
        onClick={() => alert("Edit feature coming soon!")}
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
      >
        <PencilIcon className="w-5 h-5" />
      </button>

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
