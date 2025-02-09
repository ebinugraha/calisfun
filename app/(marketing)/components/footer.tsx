import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="text-center py-5 upper font-bold text-muted-foreground">
        Developed by :
      </div>
      <div className="max-w-screen-xl mx-auto flex items-center justify-evenly h-full">
        <Button size={"lg"} variant={"ghost"} className="w-full">
          {/* <Image src="/github.svg" width={40} height={40} alt="github" /> */}
          <Link
            href={"https://www.linkedin.com/in/raka-putra-pratidina-558146263/"}
          >
            Raka Putra
          </Link>
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          {/* <Image src="/facebook.svg" width={40} height={40} alt="github" /> */}
          <Link href="https://www.linkedin.com/in/haikal-iman-firdaus/">
            Haikal Iman
          </Link>
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full" asChild>
          {/* <Image src="/instagram.svg" width={40} height={40} alt="github" /> */}
          <Link href="https://api.whatsapp.com/send?phone=628112294203&text=Halo%20min%20%F0%9F%91%8B%0A%0Asaya%20mau%20nanya%3A%20%22content%22">
            Dewa nyoman
          </Link>
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          {/* <Image src="/instagram.svg" width={40} height={40} alt="github" /> */}
          <Link href={"https://www.instagram.com/tadayumii/"}>Abriel Fata</Link>
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          {/* <Image src="/instagram.svg" width={40} height={40} alt="github" /> */}
          <Link href="https://github.com/ebinugraha">Febrian Nugraha</Link>
        </Button>
      </div>
      <div className="max-w-screen-xl mx-auto flex items-center justify-evenly h-full">
        <p className="text-sm">© 2024 Calisfun. All rights reserved.</p>
      </div>
    </footer>
  );
};
