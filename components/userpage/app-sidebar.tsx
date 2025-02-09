"use client";

import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  Search,
  Settings,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetTitle } from "../ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SignOutButton, UserButton } from "@clerk/nextjs";

// Menu items.
const items = [
  {
    title: "Belajar",
    url: "/learn",
    icon: "/home.svg",
  },
  {
    title: "Papan Peringkat",
    url: "/leaderboard",
    icon: "/medal.svg",
  },
  {
    title: "Petualangan",
    url: "/quest",
    icon: "/dart.svg",
  },
  {
    title: "Toko",
    url: "/shop",
    icon: "/cart.svg",
  },
];

type UserPageSidebarProps = {
  imageUrl: string | undefined;
  username: string | null | undefined;
};

export function AppSidebar({ username, imageUrl }: UserPageSidebarProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <Sidebar variant="sidebar" collapsible="icon">
        <SheetTitle></SheetTitle>

        <SidebarHeader className="mt-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Image
                  src="/calisfun_icon.svg"
                  alt="icon"
                  width={30}
                  height={30}
                />

                <div className="flex items-center space-x-5">
                  <span className="text-lg font-bold text-primary">
                    Calisfun
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarSeparator />

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="mt-3">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    variant={"/courses" === pathname ? "active" : "default"}
                    className="flex items-center py-5 uppercase font-bold my-1"
                  >
                    <Link href={"/courses"}>
                      <Image
                        src={"/courses.svg"}
                        alt="icon"
                        width={30}
                        height={30}
                        // className=""
                      />
                      <span>Kursus</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarSeparator />
                {items.map((item) => {
                  const isActive = item.url === pathname;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        variant={isActive ? "active" : "default"}
                        className="flex items-center py-5 uppercase font-bold my-1"
                      >
                        <Link href={item.url}>
                          <Image
                            src={item.icon}
                            alt="icon"
                            width={30}
                            height={30}
                            // className=""
                          />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator />

        <SidebarFooter className="">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-3">
                <UserButton />
                <h1 className="text-sm font-bold">Halo, <span className="text-primary">{username}</span></h1>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </Sheet>
  );
}
