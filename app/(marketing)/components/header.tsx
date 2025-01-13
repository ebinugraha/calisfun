import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Dice2, Loader2 } from "lucide-react";
import Image from "next/image";
import type { User } from "@clerk/nextjs/server";
import { UserNav } from "./user-nav";
import Link from "next/link";

type UserNavbar = {
  user: User | null;
};

export const Header = ({ user }: UserNavbar) => {
  return (
    <div className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen-xl mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src={"calisfun_icon.svg"} alt="logo" width={30} height={30} />
          <h1 className="text-primary text-xl font-bold tracking-wide">
            Calisfun
          </h1>
        </div>
        <ClerkLoading>
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className="flex items-center gap-x-4">
              <h1 className="text-sm hidden md:block">
                Hi👋,{" "}
                <span className="text-primary font-bold">{user?.username}</span>
              </h1>
              <Button variant={"primary"} asChild>
                <Link href={"/learn"}>Ayo Bermain</Link>
              </Button>
              <UserNav userInfo={user} />
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-x-2">
              <SignInButton mode="modal">
                <Button variant={"primary"} size={"sm"}>
                  Ayo Bermain
                  <Dice2 className="h-4 w-4 ml-1" />
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant={"secondary"} size={"sm"}>
                  DAFTAR
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </div>
  );
};
