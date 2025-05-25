// app/address/page.tsx
import { AddressCard } from "./addresscard";

interface Address {
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
}

async function getUserAddresses(): Promise<Address[]> {
  // Replace with actual DB call
  return [
    {
      id: "1",
      name: "Home",
      firstName: "Pratyush",
      lastName: "Rout",
      phoneNumber: "9876543210",
      streetAddress: "123 Green St",
      city: "Bangalore",
      state: "KA",
      country: "India",
      postalcode: "560001",
    },
  ];
}

export default async function AddressPage() {
  const addresses = await getUserAddresses();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Saved Addresses</h1>
      <div className="space-y-4">
        {addresses.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>
    </div>
  );
}
