"use client";

import { ChallengeType } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { useAudio, useKey } from "react-use";

type Props = {
  id: number;
  imageSrc: string | null;
  audioSrc: string | null;
  text: string;
  selected?: boolean;
  shortcut: string;
  onClick: () => void;
  status: "correct" | "incorrect" | "none";
  disabled?: boolean;
  type: ChallengeType["type"];
};

export const Card = ({
  imageSrc,
  audioSrc,
  text,
  shortcut,
  selected,
  disabled,
  onClick,
  status,
  type,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [audio, _, controls] = useAudio({ src: audioSrc || "test.mp3" });
  const handleClick = useCallback(() => {
    if (disabled) {
      return;
    }

    

    controls.play();

    onClick();
  }, [disabled, onClick, controls]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2 flex flex-col items-center justify-between",
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
        selected &&
          status === "correct" &&
          "border-primary bg-blue-100 hover:bg-blue-100",
        selected &&
          status === "incorrect" &&
          "border-red-300 bg-red-100 hover:bg-red-100",
        disabled && "opacity-50 cursor-default",
        type === "HINT" && "lg:p-3 w-full"
      )}
    >
      {audio}
      {imageSrc && (
        <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full items-center justify-center flex">
          <Image src={imageSrc} alt="image" width={90} height={90} />
        </div>
      )}
      <div
        className={cn(
          "flex items-center justify-between",
          type === "HINT" && "flex-row-reverse"
        )}
      >
        {type === "SELECT" && <div />}
        <p
          className={cn(
            "text-neutral-600 text-sm lg:text-lg font-bold",
            selected && "text-sky-500",
            selected && status === "correct" && "text-primary",
            selected && status === "incorrect" && "text-rose-500"
          )}
        >
          {text}
        </p>
      </div>
    </div>
  );
};
