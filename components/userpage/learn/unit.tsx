import { LessonType, UnitType } from "@/db/schema";
import { UnitBanner } from "./unit-banner";

type UnitPropsType = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (LessonType & {
    completed: boolean;
  })[];
  activeLesson:
    | (LessonType & {
        unit: UnitType;
      })
    | undefined
    | null;
  activeLessonPercentage: number;
};

export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: UnitPropsType) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
    </>
  );
};
