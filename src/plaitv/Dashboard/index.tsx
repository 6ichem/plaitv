import { useEffect } from "react";
import styles from "./Dashboard.module.scss";

import Navigation from "./components/Navigation";
import Playlist from "./components/Playlist";
import CreatePlaylist from "./components/Overlays/CreatePlaylist";
import AddVideo from "./components/Overlays/AddVideo";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistMedia, getUserPlaylists } from "./actions";
import { getLocalAccessTokenExpiry, newAccessToken } from "../../http/utils";

export default function Dashboard() {
  const userPlaylists =
    useSelector((state: any) => state.userPlaylists.userPlaylists) ?? [];

  useEffect(() => {
    document.body.style.backgroundColor = "#18181A";
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const tokenExpireDate = new Date(getLocalAccessTokenExpiry()).valueOf();
    const currDate = new Date().valueOf();
    if (
      tokenExpireDate === currDate ||
      currDate - tokenExpireDate > 1 * 60 * 1000
    ) {
      newAccessToken();
    }
  }, []);

  useEffect(() => {
    dispatch(getUserPlaylists());
  }, []);

  return (
    <div className={styles.Dashboard}>
      <Navigation />

      <div className="w-full md:w-[80%] px-6"></div>

      <div className="block md:hidden">
        <Playlist userPlaylists={userPlaylists} />
      </div>

      <CreatePlaylist />
      <AddVideo />
    </div>
  );
}
