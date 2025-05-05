import AnnotateImage from "@/components/onboarding/AnnotateImage";

const page = () => {
  return (
    <div className="flex items-center justify-center h-full w-full flex-col p-4 bg-gray-50 dark:bg-black gap-3">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Onboarding Process
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 ">
          Step-2 : Setup Workplace
        </p>
      </div>
      <AnnotateImage />
    </div>
  );
};

export default page;
