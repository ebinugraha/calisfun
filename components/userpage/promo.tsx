
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export const Promo = () => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image
            src={"/infinite_heart.svg"}
            alt="infinite"
            height={25}
            width={25}
          />
          <h3 className="font-bold text-lg">Tingkatkan ke pro</h3>
        </div>
        <p className="text-muted-foreground">Dapatkan nyawa tak terbatas</p>
      </div>
      <Button variant={"secondary"} className="w-full" size={"lg"} asChild>
        <Link href={"/shop"}>Tingkatkan sekarang</Link>
      </Button>
    </div>
  );
};
