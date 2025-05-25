// app/profile/layout.tsx
import { StickySidebarLayout } from "@/design-system/sections/sticky-sidebar-layout";
import SideBar from "../_components/SideBar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StickySidebarLayout
      sidebarSize="small"
      sidebarPosition="before"
      sidebar={<SideBar />}
    >
      {children}
    </StickySidebarLayout>
  );
}
