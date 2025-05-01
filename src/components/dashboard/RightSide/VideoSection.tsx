import TimeLine from "./TimeLine";

const VideoSection = () => {
  return (
    <section>
      {/* Video */}
      <video
        src={"/demo-vide.mp4"}
        autoPlay
        muted
        className="w-full h-full object-cover rounded-md"
      >
        Your browser does not support the video tag.
      </video>
      {/* Timeline */}
      <TimeLine />
    </section>
  );
};

export default VideoSection;
