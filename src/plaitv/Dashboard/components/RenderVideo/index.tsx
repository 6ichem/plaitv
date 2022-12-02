import { useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/Loader";
import { setCurrentMedia } from "../../actions";
import styles from "./RenderVideo.module.scss";

export default function RenderVideo() {
  const dispatch = useDispatch();

  const [isPlaying, setPlaying] = useState<boolean>(false);

  const currentMedia = useSelector((state: any) => state.media.currentMedia);
  const playlistMedia = useSelector(
    (state: any) => state.userPlaylists.playlistMedia
  );

  const indexOfItem = playlistMedia?.indexOf(currentMedia);

  const playNextMedia = () => {
    dispatch(setCurrentMedia(playlistMedia[indexOfItem + 1]));

    setPlaying(true);
  };

  return (
    <div className="h-auto md:h-full">
      {currentMedia && currentMedia.embed_url ? (
        <div className={styles.RenderVideo}>
          <ReactPlayer
            url={currentMedia?.embed_url}
            width="100%"
            height="100%"
            onEnded={playNextMedia}
            controls={true}
            playing={isPlaying}
          />
        </div>
      ) : (
        <div className="w-full md:w-[80%] my-52 md:my-0 md:mt-52">
          <Loader type="spinner" />
        </div>
      )}
    </div>
  );
}
