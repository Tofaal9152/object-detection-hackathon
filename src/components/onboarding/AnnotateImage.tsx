"use client";
import api from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ReactPictureAnnotation } from "react-picture-annotation";
import { IShapeStyle } from "react-picture-annotation/dist/types/src/Shape";
import { toast } from "sonner";

const AnnotateImage = () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [startTime, setStartTime] = useState("09:00:00");
  const [endTime, setEndTime] = useState("17:00:00");
  const [submitting, setSubmitting] = useState(false);
  const [source, setSource] = useState<string | undefined>("CCTV Footage");

  const sourceOptions = [
    { label: "CCTV Footage", value: "CCTV Footage" },
    { label: "Recorded Video 1", value: "recorded_video_1" },
    { label: "Recorded Video 2", value: "recorded_video_2" },
  ];

  const [containerSize, setContainerSize] = useState({
    width: 800,
    height: 500,
  });
  const [annotationData, setAnnotationData] = useState([]);

  // Resize to container size (not window size)
  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = 500; // Keep a fixed height
        setContainerSize({ width, height });
      }
    };

    resize(); // Initial call
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const onSelect = (selectedId: any) => console.log("Selected:", selectedId);
  const onChange = (data: any) => {
    setAnnotationData(data); // Save annotation state
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          "/administrator/setup-workplace/?action=get-image",
          {
            responseType: "blob",
          }
        );

        const imageBlob = response.data;
        const imageObjectURL = URL.createObjectURL(imageBlob) as any;
        setImageUrl(imageObjectURL);
        console.log("Image URL:", imageObjectURL);
      } catch (error) {
        console.error("Error fetching image", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, []);

  //   console.log("Submitted Annotations:", annotationData);
  //   const data = annotationData.map((item: any) => ({
  //     desk_number: parseInt(item.comment, 10),
  //     x1_coordinate: Math.round(item?.mark?.x),
  //     y1_coordinate: Math.round(item?.mark?.y),
  //     x2_coordinate: Math.round(item?.mark?.x + item?.mark?.width),
  //     y2_coordinate: Math.round(item?.mark?.y + item?.mark?.height),
  //   }));

  //   try {
  //     const res1 = await api.post(
  //       "administrator/setup-workplace/?action=add-desks",
  //       data
  //     );
  //     const res2 = await api.post(
  //       "administrator/setup-workplace/?action=set-time",
  //       {
  //         workplace_start_time:
  //         workplace_end_time:
  //       }
  //     );

  //     toast.success("Submitted successfully!");
  //     // console.log(data)
  //   } catch (error) {
  //     console.error("Error submitting annotations:", error);
  //   }
  // };
  const handleSubmit = async () => {
    if (annotationData.length === 0 || !imageUrl || !startTime || !source) {
      toast.warning("Please fill in all fields and annotate the image.");
      return;
    }

    const data = annotationData.map((item: any) => ({
      desk_number: parseInt(item.comment),
      x1_coordinate: Math.round(item?.mark?.x),
      y1_coordinate: Math.round(item?.mark?.y),
      x2_coordinate: Math.round(item?.mark?.x + item?.mark?.width),
      y2_coordinate: Math.round(item?.mark?.y + item?.mark?.height),
    }));
    const isAllDeskNumbersFilled = annotationData.every(
      (item: any) => item.comment && !isNaN(parseInt(item.comment))
    );

    if (!isAllDeskNumbersFilled) {
      toast.warning("Please assign a desk number to all annotations.");
      return;
    }
    try {
      setSubmitting(true);

      await Promise.all([
        api.post("administrator/setup-workplace/?action=add-desks", data),
        api.post("administrator/setup-workplace/?action=set-time", {
          workplace_start_time: `${startTime}:00`,
          workplace_end_time: `${endTime}:00`,
          source,
        }),
      ]);
      toast.success("Submitted successfully!");
      router.push("/dashboard");
      setAnnotationData([]);
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to submit annotations.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
      <div className="flex justify-center gap-4 mt-4 mb-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Start Time
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="rounded border  px-2 py-1 text-sm dark:bg-black dark:text-white"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            End Time
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="rounded border  px-2 py-1 text-sm dark:bg-black dark:text-white"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Source
          </label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="rounded border  px-2 py-1 text-sm dark:bg-black dark:text-white"
          >
            {sourceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Annotator Container */}
      <div
        className="flex items-center justify-center w-full"
        ref={containerRef}
        style={{ height: "500px" }}
      >
        <div className="relative w-full h-full">
          <ReactPictureAnnotation
            image={imageUrl || ""}
            onSelect={onSelect}
            onChange={onChange}
            annotationStyle={defaultShapeStyle}
            width={containerSize.width}
            height={containerSize.height}
          />
        </div>
      </div>
      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          className="inline-flex h-12 cursor-pointer animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <div>Loading Image...</div>
            </>
          ) : (
            <>
              {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              <div>Submit</div>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AnnotateImage;
const defaultShapeStyle: IShapeStyle = {
  padding: 5,
  fontSize: 12,
  fontColor: "#212529",
  fontBackground: "#f8f9fa",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  lineWidth: 2,
  shapeBackground: "hsla(210, 16%, 93%, 0.2)",
  shapeStrokeStyle: "red",
  shadowBlur: 10,
  shapeShadowStyle: "hsla(210, 9%, 31%, 0.35)",
  transformerBackground: "#5c7cfa",
  transformerSize: 10,
};
