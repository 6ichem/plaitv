import Button from "../../../components/Button";
import styles from "./Hero.module.scss";
import HeroImg from "../../../assets/hero.svg";
import DynamicPlayer from "./DynamicPlayer";
export default function Hero() {
  return (
    <div className={styles.Hero}>
      <div className={styles.Hero__Inner}>
        <h1 className="!leading-[65px] md:!leading-[72px]">
          Create Playlists Of Your Favourite Videos From Any Site.
        </h1>
        <span>
          Private playlists to enjoy your favorite video content across the
          internet.
        </span>
        <div className={styles.Hero__InnerContent}>
          <Button
            title="Create Playlist"
            color="primary"
            rounded
            className="!h-[58px] !font-bold !capitalize !text-sm !font-semibold w-auto"
          />
          <div>
            <h3>Your Favourite Content</h3>
            <span>Create Your Private Playlist</span>
          </div>
        </div>
      </div>
      <DynamicPlayer />
    </div>
  );
}
