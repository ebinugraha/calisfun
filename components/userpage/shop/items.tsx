"use client";

import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";
import toast from "react-hot-toast";

type Props = {
  hearts: number;
  points: number;
  hasActiceSubscription: boolean;
};

const POINTS_TO_REFILL = 10;

export const Items = ({ hearts, points, hasActiceSubscription }: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
      return;
    }

    startTransition(() => {
      refillHearts();
    });
  };

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl().then((response) => {
        if(response.data) {
          window.location.href = response.data
        }
      }).catch(() => toast.error("something went wrong"))
    })
  }

  return (
    <div className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src={"/hearts.svg"} alt="hearts" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Isi ulang hati
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
        >
          {hearts === 5 ? (
            "Penuh"
          ) : (
            <div className="flex items-center">
              <Image src={"/points.svg"} alt="points" height={20} width={20} />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        <Image
          src={"/infinite_heart.svg"}
          alt="infinite"
          height={60}
          width={60}
        />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Hati tak terbatas
          </p>
        </div>
        <Button onClick={onUpgrade} disabled={pending}>{hasActiceSubscription ? "Pengaturan" : "Tingkatkan"}</Button>
      </div>
    </div>
  );
};
