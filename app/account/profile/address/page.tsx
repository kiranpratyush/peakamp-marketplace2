import { AddressCard } from "../../_components/AddressCard";
import { getAddressesForUser } from "@/app/checkout/actions/address_action";
import AddressDialog from "@/app/checkout/address-dialog";
import { createAddressForUser } from "@/app/checkout/actions/address_action";
import { Plus } from "lucide-react";
import { Button } from "@/design-system/primitives/button";

export default async function AddressPage() {
  const addresses = await getAddressesForUser();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Address Book</h1>

        <AddressDialog
          trigger={
            <Button variant="primary" size="small">
              <Plus className="h-4 w-4" />
              Add New Address
            </Button>
          }
          onSubmit={createAddressForUser}
          title="Add New Address"
        />
      </div>

      {addresses.length === 0 ? (
        <div className="bg-background rounded-xl border border-contrast-200 p-8 shadow-sm text-center">
          <p className="text-contrast-500">
            You don't have any saved addresses yet.
          </p>
          <p className="text-sm mt-2">
            Add an address to speed up checkout and delivery.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {addresses.map((address) => (
            <AddressCard address={address} key={address.id} />
          ))}
        </div>
      )}
    </div>
  );
}
