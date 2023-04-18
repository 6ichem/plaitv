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
        <h1 className="!leading-[65px] lg:!leading-[64px]">
          Create public and private video playlists of your favorite content.{" "}
        </h1>
        <span>
          Upload videos or fetch them from any URL to rewatch, share and enjoy
          your favorite moments.
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
            <a
              href="https://persistent-trapezoid-f8e.notion.site/Plai-tv-10527e6f65e041c1b493d9a99548d3b8"
              target="_blank"
            >
              Learn more
            </a>
            <span>Read about Plai.tv in our docs.</span>
          </div>
        </div>
      </div>
      <DynamicPlayer />
    </div>
  );
}
