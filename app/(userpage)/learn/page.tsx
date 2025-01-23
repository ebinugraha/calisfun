import { FeedWrapper } from "@/components/userpage/feed-wrapper";
import { StickyWrapper } from "@/components/userpage/sticky-wrapper";
import { Header } from "./components/header";
import { UserProgress } from "@/components/userpage/user-progress";
import { getUserProgress } from "@/db/queries/user-progrss";
import { redirect } from "next/navigation";
import { getUnits } from "@/db/queries/units";
import { Unit } from "@/components/userpage/learn/unit";
import { getCourseProgress, getLessonPercentage } from "@/db/queries/courses";
import { getUserSubscription } from "@/db/queries/user-subscription";
import { Promo } from "@/components/userpage/promo";
import { Quest } from "@/components/userpage/quest";

const LearnPage = async () => {
  const userProgress = await getUserProgress();
  const courseProgress = await getCourseProgress();
  const lessonPercentage = await getLessonPercentage();
  const unitsData = await getUnits();
  const userSubscription = await getUserSubscription();

  if (!userProgress || !userProgress.activeCouse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{
            title: userProgress.activeCouse.title,
            imageSrc: userProgress.activeCouse.imageSrc,
          }}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
        {!!!userSubscription?.isActive && <Promo />}
        <Quest points={userProgress.points}/>
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCouse.title} />
        {unitsData.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
