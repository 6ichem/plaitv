import { Menu, Transition } from "@headlessui/react";
import Icon from "../../../../components/Icon";
import MenuDropdown from "../Menu";
import Playlist from "../Playlist";
import SearchInput from "../SearchInput";
import styles from "./Navigation.module.scss";
import PublicNavigation from "./PublicNavigation";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navigation({ isPublicView = false }) {
  const navigate = useNavigate();

  const currentPlaylist = useSelector(
    (state: any) => state.userPlaylists.currentPlaylist
  );

  const foundProfile = useSelector((state: any) => state.explore.foundProfile);

  return (
    <div className={styles.Navigation}>
      <div className={styles.Navigation__Desktop}>
        {isPublicView ? (
          <PublicNavigation />
        ) : (
          <div className="flex items-center justify-between p-6 w-full">
            <MenuDropdown />
            <div className="w-[60%]">
              <SearchInput />
            </div>
          </div>
        )}
        <div className={styles.Playlist__Desktop}>
          <Playlist isPublicView={isPublicView} />
        </div>
      </div>
      <div className={styles.Navigation__Mobile}>
        {isPublicView ? (
          <button
            className="flex items-center transition-all duration-300 ease-in-out hover:opacity-75"
            onClick={() => navigate(`/profile/${foundProfile.username}`)}
          >
            <Icon name="arrow-left" className="mr-2" />
            <span className="text-white text-opacity-40 block">
              @{foundProfile.username}
            </span>
            <span className="text-white font-bold mx-2">|</span>

            <span className="text-white font-bold">
              {currentPlaylist?.title}
            </span>
          </button>
        ) : (
          <>
            <div className="w-full mr-3">
              <SearchInput mobileView={true} />
            </div>

            <MenuDropdown mobileView={true} />
          </>
        )}
      </div>
    </div>
  );
}
