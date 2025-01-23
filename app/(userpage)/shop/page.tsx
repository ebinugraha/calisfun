import { FeedWrapper } from "@/components/userpage/feed-wrapper";
import { Promo } from "@/components/userpage/promo";
import { Quest } from "@/components/userpage/quest";
import { Items } from "@/components/userpage/shop/items";
import { StickyWrapper } from "@/components/userpage/sticky-wrapper";
import { UserProgress } from "@/components/userpage/user-progress";
import { getUserProgress } from "@/db/queries/user-progrss";
import { getUserSubscription } from "@/db/queries/user-subscription";
import Image from "next/image";
import { redirect } from "next/navigation";
const PageShop = async () => {
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
        <Quest points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src={"/cart.svg"} alt="shop" height={90} width={90} />
        </div>
        <h1 className="text-center font-bold text-neutral-800 text-2xl mr-2">
          Toko
        </h1>
        <p className="text-muted-foreground text-center text-lg mb-6">
          Tukar point
        </p>
        <Items
          hasActiceSubscription={!!userSubscription?.isActive}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </FeedWrapper>
    </div>
  );
};

export default PageShop;
