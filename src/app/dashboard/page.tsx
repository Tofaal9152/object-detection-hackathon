import Analytics from "@/components/dashboard/RightSide/Analytics";
import VideoSection from "@/components/dashboard/RightSide/VideoSection";
import BorderGlow from "@/components/ui/BorderGlow";

const page = () => {
  return (
    <div className="container mx-auto p-4 dark:backdrop-blur-[3.5px] bg-white dark:bg-transparent rounded-xl border shadow-md z-10 h-screen">
      <section className="flex item-center justify-center  h-full">
        <div className=" mx-auto  flex max-w-7xl flex-col pt-4">
          <BorderGlow />
          <div className="relative w-full px-4 pt-4 bg-black/70 rounded-3xl border-4 border-gray-800 shadow-2xl overflow-hidden">
            {/* Recording dot */}
            {/* <div className="absolute top-3 right-4 z-10 flex items-center space-x-2 p-2 bg-black rounded-l-md">
              <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm text-white font-semibold">REC</span>
            </div> */}

            {/* Video And TimeLine */}
            <VideoSection />
            {/* <TimeLine /> */}

            {/* Camera Bezel effect */}
            <div className="absolute inset-0 border-[8px] border-black/40 rounded-3xl pointer-events-none" />

            {/* Analytics Button */}
            <Analytics />
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
