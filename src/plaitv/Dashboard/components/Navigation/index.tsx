import Icon from "../../../../components/Icon";
import MenuDropdown from "../Menu";
import Playlist from "../Playlist";
import SearchInput from "../SearchInput";
import styles from "./Navigation.module.scss";
import PublicNavigation from "./PublicNavigation";

export default function Navigation({ isPublicView = false }) {
  return (
    <div className={styles.Navigation}>
      <div className={styles.Navigation__Desktop}>
        {isPublicView ? (
          <PublicNavigation />
        ) : (
          <>
            <div className="px-6 pt-7">
              <MenuDropdown />
            </div>
            <div className="p-6 w-[50%]">
              <SearchInput />
            </div>
          </>
        )}
        <div className={styles.Playlist__Desktop}>
          <Playlist isPublicView={isPublicView} />
        </div>
      </div>

      <div className={styles.Navigation__Mobile}>
        <div className="w-full mr-3">
          <SearchInput mobileView={true} />
        </div>

        <MenuDropdown mobileView={true} />
      </div>
    </div>
  );
}
