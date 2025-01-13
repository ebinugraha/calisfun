import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
  id: number;
  title: string;
  imageSrc: string;
  onClick: (id: number) => void;
  disable: boolean;
  active: boolean;
  description: string;
};

export const Card = ({
  id,
  title,
  imageSrc,
  onClick,
  disable,
  active,
  description,
}: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-4 pb-6 min-h-[317px] min-w-[200px]",
        disable && "pointer-events-none opacity-50"
      )}
    >
      <div className="min-[24px] w-full flex items-center justify-end">
        {active && (
          <div className="rounded-md bg-primary flex items-center justify-center p-1.5 mb-[-25px]">
            <Check className="text-white stroke-[4] h-4 w-4" />
          </div>
        )}
      </div>
      <Image
        src={imageSrc}
        alt={title}
        height={70}
        width={70}
        className="rounded-lg drop-shadow-md border object-cover"
      />
      <p className="text-neutral-800">{title}</p>
      <p className="text-sm text-neutral-600">
        "{description}"
      </p>
    </div>
  );
};
