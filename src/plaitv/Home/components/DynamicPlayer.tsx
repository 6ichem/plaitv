import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import PlaylistItem from "../../../components/PlaylistItem";
import { DEFAULT_PLAYLIST } from "../constants";
import styles from "./DynamicPlayer.module.scss";

export default function DynamicPlayer() {
  const [currentMedia, setCurrentMedia] = useState(DEFAULT_PLAYLIST[0]);
  const indexOfItem = DEFAULT_PLAYLIST.findIndex(
    (e: any) => e.title == currentMedia.title
  );

  const desktopPlayer = () => (
    <div className={styles.DynamicPlayer__Desktop}>
      <div className={styles.DynamicPlayer__Header}>
        <svg
          width="48"
          height="12"
          viewBox="0 0 48 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="6" cy="6" r="6" fill="#C83C44" />
          <ellipse cx="24.5" cy="6" rx="5.5" ry="6" fill="#CC8E45" />
          <circle cx="42" cy="6" r="6" fill="#50E856" />
        </svg>
      </div>
      <div className={styles.DynamicPlayer__Inner}>
        <div className={styles.DynamicPlayer__Controls}>
          {DEFAULT_PLAYLIST.map((i: any, idx) => (
            <PlaylistItem
              key={idx}
              title={i.title}
              desc={i.desc}
              active={idx === indexOfItem}
              onClick={() => setCurrentMedia(i)}
            />
          ))}
        </div>
        <div className={styles.DynamicPlayer__Content}>
          <ReactPlayer
            url={currentMedia.content}
            width="100%"
            height="100%"
            controls={true}
          />
        </div>
      </div>
    </div>
  );

  const mobilePlayer = () => (
    <div className={styles.DynamicPlayer__Mobile}>
      <div className={styles.DynamicPlayer__Header}>
        {DEFAULT_PLAYLIST.map((i: any, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentMedia(i)}
            className={`${(idx === indexOfItem && styles.active) || ""}`}
          >
            {i.title.substring(0, 10)}...
          </button>
        ))}
      </div>
      <ReactPlayer
        url={currentMedia.content}
        width="100%"
        className="h-full"
        controls={true}
      />
    </div>
  );

  return (
    <div className={styles.DynamicPlayer}>
      {desktopPlayer()} {mobilePlayer()}
    </div>
  );
}
