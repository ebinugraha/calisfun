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
import { useExitModal } from "@/store/use-exit-modal";
import Image from "next/image";
import { Button } from "../ui/button";

export const ExitModal = () => {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExitModal();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src={"/sad.svg"} alt="sad" height={150} width={150} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Jangan pergi dong!
          </DialogTitle>
          <DialogDescription>
            Kalo kamu pergi, maka perkembanganmu akan hilang.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant={"primary"}
              className="w-full"
              size={"lg"}
              onClick={close}
            >
              Lanjutkan belajar
            </Button>
            <Button
                variant={"dangerOutline"}
                className="w-full"
                size={"lg"}
                onClick={() => {
                    close();
                    router.push("/learn");
                }}
            >
                Ya
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
