import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { Infinity } from "lucide-react";

export const UserProgress = ({
  activeCourse, // database type
  hearts,
  points,
  hasActiveSubscription,
}: {
  activeCourse: {
    title: string;
    imageSrc: string;
  };
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
}) => {
  return (
    <div className="flex items-center gap-x-2 w-full pt-10">
      <Link href={"/courses"}>
        <Button variant={"ghost"}>
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md"
            width={50}
            height={50}
          />
        </Button>
      </Link>
      <Link href={"/shop"}>
        <Button variant={"ghost"} className="text-orange-500">
          <Image
            src={"/points.svg"}
            alt="points"
            width={30}
            height={30}
            className="mr-2"
          />
          {points}
        </Button>
      </Link>
      <Link href={"/shop"}>
        <Button variant={"ghost"} className="text-orange-500">
          <Image
            src={"/hearts.svg"}
            alt="hearts"
            width={30}
            height={30}
            className="mr-2"
          />
          {hasActiveSubscription ? (
            <Infinity className="h-4 w-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};
