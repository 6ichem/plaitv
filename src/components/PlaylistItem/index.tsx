import { ButtonHTMLAttributes } from "react";
import Icon from "../Icon";
import Loader from "../Loader";
import styles from "./PlaylistItem.module.scss";

interface propTypes {
  title: string;
  link?: string;
  desc?: string;
  active?: boolean;
  searchItem?: boolean;
  isEditState?: boolean;
  onDelete?: () => void;
  isAddLoading?: boolean;
  onAdd?: () => void;
  isDeleteLoading?: boolean;
  onClick?: () => void;
  thumbnail?: string;
}

export default function PlaylistItem({
  title,
  link,
  desc,
  active,
  searchItem = false,
  isEditState = false,
  onDelete = () => {},
  isAddLoading = false,
  onAdd = () => {},
  isDeleteLoading = false,
  onClick = () => {},
  thumbnail = "",
}: propTypes) {
  const renderActiveIcon = () =>
    thumbnail.trim().length > 0 ? (
      <img
        src={thumbnail}
        className="w-[55px] h-[43px] rounded-[5px] object-cover"
        alt=""
      />
    ) : (
      <div></div>
    );

  return (
    <div className={styles.PlaylistItem} onClick={onClick}>
      <div>
        {searchItem
          ? !isEditState && <Icon name="youtube" />
          : !isEditState && renderActiveIcon()}
      </div>
      <div
        className={`${
          ((searchItem || isEditState) &&
            "flex justify-between w-full items-center") ||
          ""
        }`}
      >
        <div>
          <h1
            className={`${styles.h1} ${
              isEditState || (!active && "!text-[#ffffff80] !font-normal") || ""
            }`}
          >
            {title}
          </h1>
          <span className={styles.span}>{link}</span>
          <p className={styles.p}>{desc}</p>
        </div>
        {searchItem && (
          <div>
            {isAddLoading ? (
              <Loader type="spinner" small />
            ) : (
              <button onClick={onAdd}>
                <Icon name="play-circle" />
              </button>
            )}
          </div>
        )}
        {isEditState && (
          <button className="pl-5" onClick={onDelete}>
            {isDeleteLoading ? (
              <Loader type="spinner" small />
            ) : (
              <Icon name="delete-icon" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
