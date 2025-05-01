import FileUploadSection from "@/components/onboarding/FileUpload";

const page = () => {
  return (
    <div className="flex items-center justify-center h-full w-full flex-col p-4 bg-gray-50 dark:bg-black gap-3">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Onboarding Process
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 ">
          Step-1 : Upload Image
        </p>
      </div>
      <FileUploadSection />
    </div>
  );
};

export default page;
