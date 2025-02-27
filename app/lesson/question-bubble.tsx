import Image from "next/image";

type Props = {
  question: string;
  imageSrc: string;
};
export const QuestionBubble = ({ question, imageSrc }: Props) => {
  return (
    <div className="flex items-center gap-x-4 mb-6">
      <Image
        src={imageSrc}
        alt={"question"}
        width={90}
        height={90}
        className={"block lg:hidden"}
      />
      <Image
        src={imageSrc}
        alt={"question"}
        width={120}
        height={120}
        className={"hidden lg:block"}
      />
      <div className="relative py-2 px-4 border-2 rounded-xl text-lg lg:text-base">
        {question}
        <div className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90" />
      </div>
    </div>
  );
};
