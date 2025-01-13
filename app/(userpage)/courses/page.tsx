import { getCourses } from "@/db/queries/courses";
import { ListCourse } from "@/components/userpage/courses/CoursesList";
import { getUserProgress } from "@/db/queries/user-progrss";

const PageCourses = async () => {
  const courses = await getCourses();
  const userProgress = await getUserProgress();

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto mt-5">
      <h1 className="text-2xl font-bold text-neutral-700">
        Tingkatan Kursus
      </h1>
        <ListCourse
          courses={courses}
          activeCourseId={userProgress?.activeCourseId}
        />
    </div>
  );
};

export default PageCourses;
