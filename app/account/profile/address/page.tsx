import { AddressCard } from "../../_components/AddressCard";
import { getAddressesForUser } from "@/app/checkout/actions/address_action";

export default async function AddressPage() {
  const addresses = await getAddressesForUser();
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Saved Addresses</h1>
      <div className="flex flex-wrap gap-4">
        {addresses.map((address) => (
          <AddressCard address={address} key={address.id} />
        ))}
      </div>
    </div>
  );
}
