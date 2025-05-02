"use client";
import { useEffect, useRef, useState } from "react";
import { ReactPictureAnnotation } from "react-picture-annotation";
import { IShapeStyle } from "react-picture-annotation/dist/types/src/Shape";

const AnnotateImage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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

  const handleSubmit = () => {
    console.log("Submitted Annotations:", annotationData);
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
      {/* Annotator Container */}
      <div
        className="flex items-center justify-center w-full"
        ref={containerRef}
        style={{ height: "500px" }}
      >
        <div className="relative w-full h-full">
          <ReactPictureAnnotation
            image="/annotateimage.jpg"
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
          Submit
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
