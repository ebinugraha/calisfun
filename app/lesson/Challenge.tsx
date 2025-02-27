import { ChallengeOptionType, ChallengeType } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Card } from "./Card";

type Props = {
  options: ChallengeOptionType[];
  onSelect: (id: number) => void;
  status: "correct" | "incorrect" | "none";
  selectedOption: number | null;
  disable?: boolean;
  type: ChallengeType["type"];
};
export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disable,
  type,
}: Props) => {
  return (
    <div className="">
      <div
        className={cn(
          "gap-2 max-w-screen flex",
          type === "HINT" && "grid-cols-1",
          type === "SELECT" &&
            "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
        )}
      >
        {options.map((option, i) => (
          <Card
            key={option.id}
            id={option.id}
            text={option.text}
            imageSrc={option.imageSrc}
            shortcut={`${i + 1}`}
            selected={selectedOption === option.id}
            onClick={() => onSelect(option.id)}
            status={status}
            audioSrc={option.audioSrc}
            disabled={disable}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};
