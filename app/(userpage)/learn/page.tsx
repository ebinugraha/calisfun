import { FeedWrapper } from "@/components/userpage/feed-wrapper";
import { StickyWrapper } from "@/components/userpage/sticky-wrapper";
import { Header } from "./components/header";
import { UserProgress } from "@/components/userpage/user-progress";
import { getUserProgress } from "@/db/queries/user-progrss";
import { redirect } from "next/navigation";
import { getUnits } from "@/db/queries/units";
import { Unit } from "@/components/userpage/learn/unit";

const LearnPage = async () => {
  const userProgress = await getUserProgress();
  const unitsData = await getUnits();

  if (!userProgress || !userProgress.activeCouse) {
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
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCouse.title} />
        {unitsData.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit. title}
              lessons={unit.lessons}
              activeLesson={undefined}
              activeLessonPercentage={0}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
