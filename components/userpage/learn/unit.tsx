import { LessonType, UnitType } from "@/db/schema";
import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";

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
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = true || lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
};
