import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-xl mx-auto flex items-center justify-evenly h-full">
        <Button size={"lg"} variant={"ghost"} className="w-full">
          {/* <Image src="/github.svg" width={40} height={40} alt="github" /> */}
          Calisfun
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          {/* <Image src="/facebook.svg" width={40} height={40} alt="github" /> */}
          Tentang
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          {/* <Image src="/instagram.svg" width={40} height={40} alt="github" /> */}
          Bantuan
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          {/* <Image src="/instagram.svg" width={40} height={40} alt="github" /> */}
          Instagram
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          {/* <Image src="/instagram.svg" width={40} height={40} alt="github" /> */}
          Facebook
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          {/* <Image src="/instagram.svg" width={40} height={40} alt="github" /> */}
          5 trio
        </Button>
      </div>
      <div className="max-w-screen-xl mx-auto flex items-center justify-evenly h-full">
        <p className="text-sm">© 2024 Calisfun. All rights reserved.</p>
      </div>
    </footer>
  );
};
