import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const TimeLine = () => {
  const select = 10;
  return (
    <div>
      <div className="mt-2 px-6 pb-2">
        <div className="relative h-10 w-full border-t border-gray-600">
          <div className="absolute inset-[-7px] flex justify-between text-xs text-white">
            {Array.from({ length: 17 }, (_, i) => {
              const hour = i === 0 ? 12 : i > 12 ? i - 12 : i;
              const suffix = i < 12 ? "AM" : "PM";
              return (
                <div
                  key={i}
                  className="flex flex-col items-center"
                  style={{ width: "5.88%" }}
                >
                  {i < select ? (
                    <div className="h-[12px] rounded-full w-[12px] bg-red-500 mb-1"></div>
                  ) : i === select ? (
                    <div className="h-[16px] w-[16px] bg-green-500 rounded-full mb-1 animate-bounce"></div>
                  ) : (
                    <div className="h-[12px] rounded-full w-[12px] bg-gray-400 mb-1"></div>
                  )}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="whitespace-nowrap cursor-pointer">
                        {hour} {suffix}
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="flex flex-col items-start space-y-1">
                          <p className="text-sm font-medium">
                            Time: {hour} {suffix}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-700">Idle:</span>
                            <span className="text-xs font-semibold text-blue-500">
                              30%
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-700">
                              Working:
                            </span>
                            <span className="text-xs font-semibold text-green-500">
                              70%
                            </span>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
