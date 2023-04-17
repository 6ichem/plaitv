import Button from "../../../components/Button";
import styles from "./Hero.module.scss";
import HeroImg from "../../../assets/hero.svg";
import DynamicPlayer from "./DynamicPlayer";
import { useNavigate } from "react-router-dom";
export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className={styles.Hero}>
      <div className={styles.Hero__Inner}>
        <h1 className="!leading-[65px] lg:!leading-[72px]">
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
            onClick={() => navigate("/register")}
            rounded
            className="!h-[58px] !font-bold !capitalize !text-sm !font-semibold w-auto"
          />
          <div>
            <a href="/">Learn more</a>
            <span>Read about Plai.tv in our docs.</span>
          </div>
        </div>
      </div>
      <DynamicPlayer />
    </div>
  );
}
