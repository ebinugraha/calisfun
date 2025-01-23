import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { FeedWrapper } from "@/components/userpage/feed-wrapper";
import { Promo } from "@/components/userpage/promo";
import { StickyWrapper } from "@/components/userpage/sticky-wrapper";
import { UserProgress } from "@/components/userpage/user-progress";
import { quest } from "@/constant/quest";
import { getUserProgress } from "@/db/queries/user-progrss";
import { getUserSubscription } from "@/db/queries/user-subscription";
import Image from "next/image";
import { redirect } from "next/navigation";

const LeaderboardPage = async () => {
  const userProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  if (!userProgress || !userProgress.activeCouse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCouse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
        {!!!userSubscription?.isActive && <Promo />}
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src={"/dart.svg"} alt="shop" height={90} width={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl mr-2">
            Misi
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Selesaikan misi untuk mendapatkan point
          </p>
          <ul className="w-full">
            {quest.map((quest) => {
              const percentage = (userProgress.points / quest.value) * 100;

              return (
                <div
                  className="flex items center w-full p-4 gap-x-4 border-t-2"
                  key={quest.title}
                >
                  <Image
                    src={"/points.svg"}
                    alt="points"
                    width={60}
                    height={69}
                  />
                  <div className="flex flex-col gap-y-2 w-full">
                    <p className="text-neutral-700 text-xl font-bold">
                      {quest.title}
                    </p>
                    <Progress value={percentage} className="h-3" />
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
