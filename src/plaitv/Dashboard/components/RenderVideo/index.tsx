import { useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/Loader";
import { setAddVideoModal, setCurrentMedia } from "../../actions";
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
      ) : playlistMedia?.length > 0 ? (
        <div className="w-full md:w-[80%] my-52 md:my-0 md:mt-52">
          <Loader type="spinner" />
        </div>
      ) : (
        <div className="w-full md:w-[80%] my-52 md:my-0 md:mt-52">
          <div className={styles.RenderVideo__NoContent}>
            <button onClick={() => dispatch(setAddVideoModal(true))}>
              Add a video
            </button>
            to your playlist.
          </div>
        </div>
      )}
    </div>
  );
}
