import { SideBar } from "@/components/side-bar/SideBar";
import { TopMenu } from "@/components/ui/top-menu/TopMenu";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <TopMenu />
      <SideBar />
      <div className="px-0 sm:px-10">{children}</div>
    </div>
  );
}
