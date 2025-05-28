"use server";

import { prisma } from "@/lib/db"; // assumes prisma client is exported here
import { revalidatePath } from "next/cache";
export type FormValues = {
  id: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  phoneNumber?: string;
  streetAddress: string;
  apartmentSuite?: string;
  city: string;
  country: string;
  postalcode: string;
  state: string;
  name: string; // Address type (e.g., Home, Work)
  saveForFuture?: boolean;
};

export async function getAddressesForUser(): Promise<FormValues[]> {
  const email = "dummy@example.com";
  const user = await prisma.user.findUnique({
    where: { email },
    include: { addresses: true },
  });

  if (!user) return [];

  return user.addresses.map(toFormValues);
}

export async function createAddressForUser(data: FormValues) {
  try {
    // 1. Dummy user for now (replace with real user from auth)
    const email = "dummy@example.com";
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // 2. Store address
    const address = await prisma.address.create({
      data: {
        userId: user.id,
        name: data.name,
        firstName: data.firstName,
        lastName: data.lastName,
        companyName: data.companyName,
        phoneNumber: data.phoneNumber,
        streetAddress: data.streetAddress,
        apartmentSuite: data.apartmentSuite,
        city: data.city,
        country: data.country,
        postalcode: data.postalcode,
        state: data.state,
      },
    });
    const formValues = toFormValues(address);

    revalidatePath("/checkout");

    return { success: true, formValues };
  } catch (error: unknown) {
    console.error("Failed to create address:", error);
    return { success: false, error: (error as Error).message };
  }
}
export async function updateAddressForUser(data: FormValues) {
  try {
    const email = "dummy@example.com";
    const user = await prisma.user.findUnique({
      where: { email },
      include: { addresses: true },
    });
    if (!user) throw new Error("User not found");
    const addressToUpdate = user.addresses.find((addr) => addr.id === data.id);
    if (!addressToUpdate) throw new Error("Address not found or access denied");
    const updated = await prisma.address.update({
      where: { id: data.id },
      data: {
        name: data.name,
        firstName: data.firstName,
        lastName: data.lastName,
        companyName: data.companyName,
        phoneNumber: data.phoneNumber,
        streetAddress: data.streetAddress,
        apartmentSuite: data.apartmentSuite,
        city: data.city,
        country: data.country,
        postalcode: data.postalcode,
        state: data.state,
      },
    });
    revalidatePath("/account/profile/address");
    return { success: true, formValues: toFormValues(updated) };
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message };
  }
}

function toFormValues(address: any): FormValues {
  return {
    firstName: address.firstName,
    lastName: address.lastName,
    companyName: address.companyName ?? undefined,
    phoneNumber: address.phoneNumber ?? undefined,
    streetAddress: address.streetAddress,
    apartmentSuite: address.apartmentSuite ?? undefined,
    city: address.city,
    country: address.country,
    postalcode: address.postalcode,
    state: address.state,
    name: address.name,
    saveForFuture: false, // default: user must explicitly choose to save
    id: address.id,
  };
}
