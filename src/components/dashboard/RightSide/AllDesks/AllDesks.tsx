"use client";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import api from "@/lib/api";
import { Meteors } from "@/components/ui/meteors"; // optional

const AllDesks = () => {
  const [deskData, setDeskData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeskData = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(
          `stream/realtime-data/?action=desk-analytics`
        );
        setDeskData(res?.data);
      } catch (error) {
        console.error("Error fetching desk data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeskData();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        All Desks Overview
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <Loader className="animate-spin h-6 w-6 text-gray-500" />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {deskData.map((desk) => (
            <div key={desk.id} className="">
              <div className="relative w-full max-w-xl">
                <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
                <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 px-4 py-8 shadow-xl">
                  <div className="mb-4 flex h-5 w-5 items-center justify-center rounded-full border border-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-2 w-2 text-gray-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                      />
                    </svg>
                  </div>

                  <h1 className="relative z-50 mb-4 text-xl font-bold text-white">
                    🪑 Desk #{desk.desk_number}
                  </h1>

                  <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
                    🧭 Coordinates: ({desk.x1_coordinate}, {desk.y1_coordinate})
                    to ({desk.x2_coordinate}, {desk.y2_coordinate})
                  </p>
                  {/* <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
                    🧭 Coordinates: ({desk.x1_coordinate}, {desk.y1_coordinate})
                    to ({desk.x2_coordinate}, {desk.y2_coordinate})
                  </p> */}
                  <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
                    🏢 Workplace ID: {desk.workplace}
                  </p>
                  <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
                    🕒 Created: {new Date(desk.created_at).toLocaleString()}
                  </p>

                  {/* Meaty part - Meteor effect */}
                  <Meteors number={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDesks;
