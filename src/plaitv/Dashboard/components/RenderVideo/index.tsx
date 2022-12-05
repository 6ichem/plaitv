import { useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/Loader";
import { setAddVideoModal, setCurrentMedia } from "../../actions";
import { MEDIA_PLAYER_PLATFORMS } from "../../constants";
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

  const isMediaPlayer = MEDIA_PLAYER_PLATFORMS.some(
    (i: any) => currentMedia && currentMedia.source.includes(i)
  );

  return (
    <div className="h-auto lg:h-full">
      {currentMedia && currentMedia.embed_url ? (
        <div className={styles.RenderVideo}>
          {isMediaPlayer ? (
            <ReactPlayer
              url={currentMedia?.embed_url}
              width="100%"
              height="100%"
              onEnded={playNextMedia}
              controls={true}
              playing={isPlaying}
            />
          ) : (
            <iframe
              width="100%"
              height="100%"
              src={currentMedia?.embed_url}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      ) : playlistMedia?.length > 0 ? (
        <div className="w-full lg:w-[80%] my-52 lg:my-0 lg:mt-52">
          <Loader type="spinner" />
        </div>
      ) : (
        <div className="w-full lg:w-[80%] py-52 lg:py-0 lg:pt-52">
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
