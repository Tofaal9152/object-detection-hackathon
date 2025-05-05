import Link from "next/link";

const page = () => {
  const data = [
    {
      id: 1,
      title: "Step 1: Upload Image",
      description: "Pick an image to upload and annotate.",
    },
    {
      id: 2,
      title: "Step 2: Annotate Image",
      description: "Use the annotation tools to mark up your image.",
    },
    {
      id: 3,
      title: "Step 3: Get Started",
      description: "Dashboard will be ready in a few seconds.",
    },
  ];
  return (
    <section className="flex flex-col items-center justify-center h-full p-4 bg-gray-50 dark:bg-black">
      <div className="space-y-8">
        {data.map((item) => (
          <div
            key={item.id}
            className="border relative p-4 rounded-lg shadow-md "
          >
            <div className="absolute animate-pulse inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
              <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>
            <div className="absolute animate-pulse inset-x-0 top-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
              <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>
            <div className=" space-y-3">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link href={"/onboarding/file-upload"}>
        <button className="inline-flex mt-8 h-12 cursor-pointer animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Click to Start!
        </button>
      </Link>
    </section>
  );
};

export default page;
