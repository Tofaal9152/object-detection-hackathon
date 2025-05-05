import Onboarding from "@/components/onboarding/Onboarding";
import BorderGlow from "@/components/ui/BorderGlow";

const page = () => {

  return (
    <div className="container mx-auto p-4 dark:backdrop-blur-[3.5px] bg-white dark:bg-transparent rounded-xl border shadow-md z-10 ">
      <section>
        <div className=" mx-auto  flex max-w-7xl flex-col items-center justify-center">
          <BorderGlow />
        </div>
        <Onboarding/>
      </section>
    </div>
   
  );
};

export default page;
