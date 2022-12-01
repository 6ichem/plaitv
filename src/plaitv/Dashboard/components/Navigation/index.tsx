import Icon from "../../../../components/Icon";
import MenuDropdown from "../Menu";
import Playlist from "../Playlist";
import SearchInput from "../SearchInput";
import styles from "./Navigation.module.scss";

export default function Navigation() {
  return (
    <div className={styles.Navigation}>
      <div className={styles.Navigation__Desktop}>
        <div className="px-6 pt-7">
          <MenuDropdown />
        </div>
        <div className="p-6 w-[50%]">
          <SearchInput />
        </div>
        <div className={styles.Playlist__Desktop}>
          <Playlist />
        </div>
      </div>

      <div className={styles.Navigation__Mobile}>
        <div className="w-full mr-3">
          <SearchInput />
        </div>

        <div>
          <Icon name="mobile-menu" />
        </div>
      </div>
    </div>
  );
}
