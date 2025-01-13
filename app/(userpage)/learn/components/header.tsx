import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className="sticky top-0 pt-5 bg-white pb-3 lg:pt-[20px] lg:mt-[20px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
      <Link href="/courses">
        <Button className="text-neutral-400" size={"sm"}>
          <ArrowLeft className="mr-2 h-5 w-5 stroke-2" />
          Kembali
        </Button>
      </Link>
      <h1 className="font-bold text-lg">
        {title}
      </h1>
      <div/>
    </div>
  );
};
