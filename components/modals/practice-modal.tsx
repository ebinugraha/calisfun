"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { useHeartsModal } from "@/store/use-hearts-modal";
import Image from "next/image";
import { Button } from "../ui/button";


export const PracticeModal = () => {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useHeartsModal();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const onClick = () => {
    close();
    router.push('/store')
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src={"/hearts.svg"}
              alt="hearts"
              height={150}
              width={150}
            />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Praktek
          </DialogTitle>
          <DialogDescription className="text-center">
            Praktek quiz untuk meningkatkan kemampuanmu. kamu tidak akan kehilangan point di praktek
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant={"primary"}
              className="w-full"
              size={"lg"}
              onClick={onClick}
            >
              Nyawa tak terbatas
            </Button>
            <Button
              variant={"primaryOutline"}
              className="w-full"
              size={"lg"}
              onClick={close}
            >
              Tidak, terimakasih
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
