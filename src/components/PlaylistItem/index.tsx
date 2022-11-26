import Icon from "../Icon";
import styles from "./PlaylistItem.module.scss";

interface propTypes {
  title: string;
  link: string;
  desc?: string;
  active?: boolean;
  searchItem?: boolean;
}

export default function PlaylistItem({
  title,
  link,
  desc,
  active,
  searchItem = false,
}: propTypes) {
  const renderActiveIcon = () =>
    active ? <Icon name="play-active" /> : <Icon name="play-inactive" />;

  return (
    <div className={styles.PlaylistItem}>
      <div>{searchItem ? <Icon name="youtube" /> : renderActiveIcon()}</div>
      <div className={`${(searchItem && "flex justify-between w-full") || ""}`}>
        <div>
          <h1>{title}</h1>
          <span>{link}</span>
          <p>{desc}</p>
        </div>
        {searchItem && (
          <div>
            <Icon name="play-circle" />
          </div>
        )}
      </div>
    </div>
  );
}
