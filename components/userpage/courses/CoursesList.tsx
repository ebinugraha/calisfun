"use client";

import { CoursesType, UserProgressType } from "@/db/schema";
import { Card } from "./CourseCard";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setCourse } from "@/actions/user-progress";
import { useCourseNotFoundModal } from "@/store/use-course-not-found-modal";

type Props = {
  courses: CoursesType[];
  activeCourseId?: UserProgressType["activeCourseId"];
};

export const ListCourse = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { open } = useCourseNotFoundModal();

  // NOTE: jika di klik maka akan ke halaman learn
  // jika id nya sama dengan id yang aktif maka akan pindah ke halaman learn
  // jika belum memilih course maka update ke activeCourseId
  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      return router.push("/learn");
    }

    startTransition(() => {
      setCourse(id).catch(() => open());
      // .catch(() => toast.error("Gagal mengatur kursus!"))
    });
  };

  return (
    <div className="pt-6 grid grid-cols-1 lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          onClick={onClick}
          disable={pending}
          imageSrc={course.imageSrc}
          active={activeCourseId === course.id}
          description={course.description}
        />
      ))}
    </div>
  );
};
