import Downloader from "@/app/components/Downloader";

const VideoPage = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <Downloader videoId={id} />
    </div>
  );
};

export default VideoPage;
