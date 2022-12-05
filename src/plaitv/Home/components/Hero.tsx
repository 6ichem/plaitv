import Button from "../../../components/Button";
import styles from "./Hero.module.scss";
import HeroImg from "../../../assets/hero.svg";
export default function Hero() {
  const Vector = () => (
    <svg
      width="353"
      height="16"
      viewBox="0 0 353 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-6 hidden md:block"
    >
      <path
        d="M2 2.44149C298.549 0.864199 352.125 3.79719 350.982 6.75463C350.982 6.75463 -66.5399 6.70593 16.2791 11.3064C71.5081 14.3742 208.762 13.9839 208.762 13.9839"
        stroke="#CC8E45"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );

  const MobileVector = () => (
    <svg
      width="334"
      height="15"
      viewBox="0 0 334 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-6 block md:hidden absolute"
    >
      <path
        d="M2 2.4047C282.405 0.958849 333.063 3.64742 331.983 6.35841C331.983 6.35841 -62.8085 6.31377 15.5017 10.5308C67.724 13.3431 197.506 12.9853 197.506 12.9853"
        stroke="#CC8E45"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div className={styles.Hero}>
      <div>
        <h1 className="!leading-[65px] md:!leading-[72px]">
          Create Playlists Of Your Favourite Videos <Vector />
          <MobileVector />
          From Any Site.
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
      <img src={HeroImg} alt="" />
    </div>
  );
}
