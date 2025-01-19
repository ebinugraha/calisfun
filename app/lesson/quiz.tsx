"use client";

import { ChallengeOptionType, ChallengeType } from "@/db/schema";
import { useState, useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./Challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import toast from "react-hot-toast";
import { reduceHearts } from "@/actions/user-progress";

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
  const [pending, startTransition] = useTransition();

  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initiallessonChallenges);
  const [status, setStatus] = useState<"correct" | "incorrect" | "none">(
    "none"
  );

  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const onNext = () => {
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

    if (correctOption && correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              console.log("Hati habis");
              return;
            }

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
        console.log("ini di jalankan")
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              console.error("Missing");
              return;
            }
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

  const title = challenge.type === "HINT" ? "Pilih opsi" : challenge.question;

  return (
    <div className="flex-1">
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
        lessonId={1}
      />
    </div>
  );
};
