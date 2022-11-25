import styles from "./PlaylistItem.module.scss";

interface propTypes {
  title: string;
  link: string;
  desc?: string;
  active?: boolean;
}

export default function PlaylistItem({ title, link, desc, active }: propTypes) {
  return (
    <div className={styles.PlaylistItem}>
      <div>
        {active ? (
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.9999 31.1666C24.824 31.1666 31.1666 24.824 31.1666 16.9999C31.1666 9.17588 24.824 2.83325 16.9999 2.83325C9.17588 2.83325 2.83325 9.17588 2.83325 16.9999C2.83325 24.824 9.17588 31.1666 16.9999 31.1666Z"
              fill="#CC8E45"
            />
            <path
              d="M14.1667 11.3333L22.6667 16.9999L14.1667 22.6666V11.3333Z"
              fill="black"
            />
          </svg>
        ) : (
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.9999 31.1666C24.824 31.1666 31.1666 24.824 31.1666 16.9999C31.1666 9.17588 24.824 2.83325 16.9999 2.83325C9.17588 2.83325 2.83325 9.17588 2.83325 16.9999C2.83325 24.824 9.17588 31.1666 16.9999 31.1666Z"
              stroke="white"
              strokeOpacity="0.5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.1667 11.3333L22.6667 16.9999L14.1667 22.6666V11.3333Z"
              stroke="white"
              strokeOpacity="0.5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div>
        <h1>{title}</h1>
        <span>{link}</span>
        <p>{desc}</p>
      </div>
    </div>
  );
}
