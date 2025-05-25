"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = {
  "": "My Profile",
  address: "Address Book",
  orders: "My Orders",
} as const;

export default function SideBar() {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      {Object.entries(links).map(([key, label]) => {
        const href = key ? `/account/profile/${key}` : "/account/profile";

        const isActive =
          (key === "" && pathname === "/account/profile") ||
          pathname.endsWith(`/${key}`);

        return (
          <Link
            key={key}
            href={href}
            className={`block w-full text-left px-4 py-2 rounded text-sm font-medium transition ${
              isActive
                ? "bg-primary-highlight"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
