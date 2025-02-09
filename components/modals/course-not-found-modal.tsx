"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useCourseNotFoundModal } from "@/store/use-course-not-found-modal";

export const CourseNotFoundModal = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useCourseNotFoundModal();

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
            <Image
              src={"/notfound.svg"}
              alt="Not found"
              height={150}
              width={150}
            />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Course tidak ditemukan!
          </DialogTitle>
          <DialogDescription>
            Course dengan tingkatan ini sedang dalam progress. cek lain kali.
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
              Oke
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
