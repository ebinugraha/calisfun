import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/userpage/app-sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

const UserPageLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  // mendapatkan user
  const user = await currentUser();

  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar imageUrl={user?.imageUrl} username={user?.username} />

        <main className="w-full pt-[50px]">
          <nav className="px-6 h-[65px] flex items-center border-b fixed top-0 w-full z-50 bg-white">
            <SidebarTrigger />
          </nav>
          <div className="h-full max-w-[1056px] mx-auto pt-6">{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default UserPageLayout;
