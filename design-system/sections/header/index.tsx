"use server";
import { prisma } from "@/lib/db";
import { HeaderSection } from "@/design-system/sections/header-section";
import { Streamable } from "@/lib/streamable";
import { auth } from "@clerk/nextjs/server";

export async function getCartCount() {
  try {
    // Find the dummy user
    const dummyEmail = "dummy@example.com";
    const user = await prisma.user.findUnique({
      where: { email: dummyEmail },
      include: {
        Cart: {
          include: {
            items: true,
          },
        },
      },
    });

    // If no user or cart exists yet, return 0
    if (!user || !user.Cart) {
      return 0;
    }

    // Count total items in cart
    const itemCount = user.Cart.items.reduce((total: any, item: any) => {
      return total + item.quantity;
    }, 0);

    return itemCount;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return 0;
  }
}

// Mock navigation links (top-level + grouped)
const mockLinks = Streamable.from(async () => [
  {
    label: "Home",
    href: "/",
    groups: [],
  },
  {
    label: "Shop all ",
    href: "/shop-all",
  },
]);

export const Header = async () => {
  const { userId } = await auth();

  // Get actual cart count from database
  const cartCount = await getCartCount();
  console.log(userId);
  let accountHref = "/account/sign-in";
  if (userId) {
    accountHref = "/account/profile";
  }

  return (
    <HeaderSection
      navigation={{
        accountHref: accountHref,
        accountLabel: "Profile",
        cartHref: "/cart",
        cartLabel: "Cart",
        searchHref: "",
        searchParamName: "term",
        searchAction: undefined,
        links: mockLinks,
        logo: "Peak AMP",
        mobileMenuTriggerLabel: "Menu",
        openSearchPopupLabel: "Search",
        logoLabel: "Home",
        cartCount: cartCount,
        activeLocaleId: "en",
        locales: undefined,
        currencies: undefined,
        activeCurrencyId: undefined,
        currencyAction: undefined,
      }}
    />
  );
};
