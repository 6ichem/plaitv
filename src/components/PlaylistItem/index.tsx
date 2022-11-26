import Icon from "../Icon";
import styles from "./PlaylistItem.module.scss";

interface propTypes {
  title: string;
  link: string;
  desc?: string;
  active?: boolean;
  searchItem?: boolean;
  isEditState?: boolean;
}

export default function PlaylistItem({
  title,
  link,
  desc,
  active,
  searchItem = false,
  isEditState = false,
}: propTypes) {
  const renderActiveIcon = () =>
    active ? <Icon name="play-active" /> : <Icon name="play-inactive" />;

  return (
    <div className={styles.PlaylistItem}>
      <div>
        {searchItem
          ? !isEditState && <Icon name="youtube" />
          : !isEditState && renderActiveIcon()}
      </div>
      <div
        className={`${
          ((searchItem || isEditState) && "flex justify-between w-full") || ""
        }`}
      >
        <div>
          <h1 className={`${isEditState && "!text-[#ffffff80] !font-normal"}`}>
            {title}
          </h1>
          <span>{link}</span>
          <p>{desc}</p>
        </div>
        {searchItem && (
          <div>
            <Icon name="play-circle" />
          </div>
        )}
        {isEditState && (
          <div>
            <Icon name="delete-icon" />
          </div>
        )}
      </div>
    </div>
  );
}
