import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useKey, useMedia } from "react-use";

type Props = {
  onCheck: () => void;
  status: "correct" | "incorrect" | "none" | "completed";
  disable?: boolean;
  lessonId?: number;
};

export const Footer = ({ onCheck, status, disable, lessonId }: Props) => {
  useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-width: 1024px)");
  const router = useRouter();

  return (
    <footer
      className={cn(
        "lg:-h[140px] h-[100px] border-t-2",
        status === "correct" && "border-transparent bg-green-100",
        status === "incorrect" && "border-transparent bg-red-100"
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" ? (
          <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
            <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Betul
          </div>
        ) : (
          <div />
        )}
        {status === "incorrect" ? (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Salah
          </div>
        ) : (
          <div />
        )}

        {status === "completed" ? (
          <Button
            variant={"default"}
            // size={isMobile ? "sm" : "lg"}
            onClick={() => router.replace(`/lesson/${lessonId}`)}
          >
            Ulangi lagi
          </Button>
        ) : (
          <div />
        )}

        <Button
          disabled={disable}
          className="ml-auto"
          onClick={onCheck}
          // size={isMobile ? "sm" : "lg"}
          variant={status === "incorrect" ? "danger" : "secondary"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Selanjutnya"}
          {status === "incorrect" && "Ulangi"}
          {status === "completed" && "Lanjutkan"}
        </Button>
      </div>
    </footer>
  );
};
