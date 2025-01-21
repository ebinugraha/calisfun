"use client";

import { ChallengeOptionType, ChallengeType } from "@/db/schema";
import { useEffect, useState, useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./Challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import toast from "react-hot-toast";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useMount, useWindowSize } from "react-use";
import Image from "next/image";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import Conffeti from "react-confetti";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

type QuizType = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initiallessonChallenges: (ChallengeType & {
    completed: boolean;
    challengeOptions: ChallengeOptionType[];
  })[];
  userSubscription: any;
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initiallessonChallenges,
  userSubscription,
}: QuizType) => {
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();

  useMount(() => {
    openPracticeModal()
  })

  const { width, height } = useWindowSize();

  const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });
  const [correctAudio, _c, correctControls] = useAudio({
    src: "/correct.wav",
    autoPlay: false,
  });
  const [inCorrectAudio, _i, inCorrectControls] = useAudio({
    src: "/incorrect.wav",
    autoPlay: false,
  });
  const [lessonId, setLessonId] = useState(initialLessonId);
  const [pending, startTransition] = useTransition();

  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage
  });

  const [challenges] = useState(initiallessonChallenges);
  const [status, setStatus] = useState<"correct" | "incorrect" | "none">(
    "none"
  );
  const [shouldRenderAudio, setShouldRenderAudio] = useState(false);

  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  useEffect(() => {
    openPracticeModal();
  }, [percentage]);



  const router = useRouter();

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Advances to the next challenge in the quiz by incrementing the active index.
   */

  /******  fde62a66-7db6-4a4e-bb65-69134e1385bd  *******/ const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const onSelect = (id: number) => {
    if (status !== "none") return;

    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "incorrect") {
      setStatus("none");
      setSelectedOption(null);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(null);
      return;
    }

    const correctOption = options.find((option) => option.correct);

    if (!correctOption) return;

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            // This is a practice
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("Gagal menyimpan progress!"));
      });
    } else {
      startTransition(() => {
        console.log("ini di jalankan");
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }
            inCorrectControls.play();
            setStatus("incorrect");

            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong!"));
      });
    }
  };

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  if (!challenge) {
    return (
      <>
        {finishAudio}
        {inCorrectAudio}
        {correctAudio}
        <Conffeti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
          width={width}
          height={height}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto items-center justify-center h-full">
          <Image
            src="/finish.svg"
            alt="finish"
            className="hidden lg:block"
            height={100}
            width={100}
          />
          <Image
            src="/finish.svg"
            alt="finish"
            className="block lg:hidden"
            height={50}
            width={50}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700 text-center">
            Kerja bagus!
            <br />
            Kamu telah menyelesaikan tes
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
        />
      </>
    );
  }

  const title = challenge.type === "HINT" ? "Pilih opsi" : challenge.question;

  return (
    <div className="flex-1">
      {finishAudio}
      {inCorrectAudio}
      {correctAudio}
      <div>
        <Header
          hearts={hearts}
          percentage={percentage}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
      </div>
      <div className="h-full flex flex-col items-center justify-center sm:mt-[-148px] lg:mt-[-170px]">
        <h1 className="text-3xl lg:text-4xl text-center lg:text-start font-bold text-neutral-700 mb-10">
          {title}
        </h1>
        <div>
          {challenge.type === "HINT" && (
            <QuestionBubble question={challenge.question} />
          )}
          <Challenge
            options={options}
            onSelect={onSelect}
            status={status}
            selectedOption={selectedOption}
            disable={pending}
            type={challenge.type}
          />
        </div>
      </div>
      <Footer
        onCheck={onContinue}
        status={status}
        disable={pending || !selectedOption}
      />
    </div>
  );
};
