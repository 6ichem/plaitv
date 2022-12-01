import { useSelector } from "react-redux";
import Loader from "../../../../components/Loader";
import styles from "./RenderVideo.module.scss";

export default function RenderVideo() {
  const currentMedia = useSelector((state: any) => state.media.currentMedia);

  return (
    <div className="h-full">
      {currentMedia && currentMedia.embed_url ? (
        <div className={styles.RenderVideo}>
          <iframe
            width="560"
            className="w-full h-[80%]"
            height="315"
            src={currentMedia?.embed_url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="w-[80%] mt-52">
          <Loader type="spinner" />
        </div>
      )}
    </div>
  );
}
