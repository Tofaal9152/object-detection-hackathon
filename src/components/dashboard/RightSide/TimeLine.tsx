"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import api from "@/lib/api";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
const TimeLine = () => {
  type TimelineData = {
    time: string;
    idle: number;
    working: number;
    empty: number;
  };
  const [timeline, setimeline] = useState<TimelineData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTimeLine = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("stream/realtime-data/?action=analytics", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log(res.data.timeline);
        setimeline(res.data.timeline);
      } catch (error) {
        console.error("Error fetching video stream:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeLine();
  }, []);

  return (
    <div>
      <div className="mt-2 px-6 pb-2">
        <div className="relative h-10 w-full border-t border-gray-600">
          <div className="absolute inset-[-7px] flex justify-between text-xs text-white w-full">
            {!isLoading ? (
              <>
                {timeline?.map((item, index) => {
                  const hourNum = parseInt(item.time.split(":")[0]);
                  const hour =
                    hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
                  const suffix = hourNum < 12 ? "AM" : "PM";

                  return (
                    <div
                      key={item.time}
                      className="flex flex-col items-center"
                      style={{ width: `${100 / timeline.length}%` }}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="whitespace-nowrap cursor-pointer flex flex-col items-center">
                            {index < timeline.length - 1 ? (
                              <div className="h-[12px] rounded-full w-[12px] bg-red-500 mb-1"></div>
                            ) : index === timeline.length - 1 ? (
                              <div className="h-[12px] w-[12px] bg-green-500 rounded-full mb-1 animate-bounce"></div>
                            ) : (
                              <div className="h-[12px] rounded-full w-[12px] bg-gray-400 mb-1"></div>
                            )}

                            <div>
                              {hour} {suffix}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="flex flex-col items-start space-y-1">
                              <p className="text-sm font-medium">
                                Time: {hour} {suffix}
                              </p>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-700">
                                  Idle:
                                </span>
                                <span className="text-xs font-semibold text-blue-500">
                                  {item.idle}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-700">
                                  Working:
                                </span>
                                <span className="text-xs font-semibold text-green-500">
                                  {item.working}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-700">
                                  Empty:
                                </span>
                                <span className="text-xs font-semibold text-red-500">
                                  {item.empty}
                                </span>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-500">
                <Loader className="animate-spin" size={24} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
