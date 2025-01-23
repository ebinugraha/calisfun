import { getLesson } from "@/db/queries/courses";
import { getUserProgress } from "@/db/queries/user-progrss";
import { redirect } from "next/navigation";
import { Quiz } from "../quiz";
import { getUserSubscription } from "@/db/queries/user-subscription";

const LessonIdPage = async ({
  params,
}: {
  params: Promise<{ lessonId: number }>;
}) => {
  const { lessonId } = await params;

  const lesson = await getLesson(lessonId);
  const userProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initiallessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
    />
  );
};

export default LessonIdPage;
