import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { FeedWrapper } from "@/components/userpage/feed-wrapper";
import { StickyWrapper } from "@/components/userpage/sticky-wrapper";
import { UserProgress } from "@/components/userpage/user-progress";
import { getLeaderboard } from "@/db/queries/leader-board";
import { getUserProgress } from "@/db/queries/user-progrss";
import { getUserSubscription } from "@/db/queries/user-subscription";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Promo } from "@/components/userpage/promo";
import { Quest } from "@/components/userpage/quest";
const LeaderboardPage = async () => {
  const userProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();
  const leaderboard = await getLeaderboard();

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
        <Quest points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src={"/medal.svg"} alt="shop" height={90} width={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl mr-2">
            Papan Peringkat
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Lihat peringkat anda di komunitas
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />
          {leaderboard.map((user, index) => {
            return (
              <div
                key={user.userId}
                className="flex items-center w-full p-2 px-4 rouded-xl hover:bg-gray-200/50"
              >
                <p className="font-bold text-primary mr-4">{index + 1}</p>
                <Avatar className="border bg-primary h-12 w-12 ml-3 mr-6">
                  <AvatarImage
                    src={user.userImageSrc}
                    className="object-cover"
                  />
                </Avatar>
                <p className="font-bold text-neutral-800 flex-1">
                  {user.userName}
                </p>
                <p className="text-muted-foreground">
                  {user.points} Xp
                </p>
              </div>
            );
          })}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
