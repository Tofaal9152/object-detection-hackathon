"use client";
import TimeLine from "./TimeLine";

const VideoSection = () => {
  return (
    <section className="max-w-6xl mx-auto">
      <div className="aspect-video w-full rounded-3xl overflow-hidden border-4 border-gray-800 shadow-2xl">
        {/* <img
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}stream/realtime-data/?action=stream`}
          alt="Video Stream"
          className="w-full h-full object-cover"
        /> */}
        <video
          src={`/demo-vide.mp4`}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
         
        />
        ;
      </div>

      {/* Timeline */}
      <TimeLine />
    </section>
  );
};

export default VideoSection;
