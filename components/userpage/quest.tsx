import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { quest } from "@/constant/quest";
import { Progress } from "../ui/progress";

type QuestProps = {
  points: number;
};

export const Quest = ({ points }: QuestProps) => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-x-2">
            <Image src={"/dart.svg"} alt="quest" height={25} width={25} />
            <h3 className="font-bold text-lg">Misi</h3>
          </div>
          <p className="text-muted-foreground">Dapatkan Points</p>
        </div>
        <Button variant={"primaryOutline"} size={"sm"} asChild>
          <Link href={"/quest"}>Lihat semuanya</Link>
        </Button>
      </div>
      <ul>
        {quest.map((quest) => {
          const percentage = (points / quest.value) * 100;

          return (
            <div
              className="flex items center w-full p-4 gap-x-4 border-t-2"
              key={quest.title}
            >
              <Image src={"/points.svg"} alt="points" width={60} height={69} />
              <div className="flex flex-col gap-y-2 w-full">
                <p className="text-neutral-700 text-xl font-bold">
                  {quest.title}
                </p>
                <Progress value={percentage} className="h-3" />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
