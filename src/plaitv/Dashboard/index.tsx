import { useEffect } from "react";
import styles from "./Dashboard.module.scss";

import Navigation from "./components/Navigation";
import Playlist from "./components/Playlist";
import CreatePlaylist from "./components/Overlays/CreatePlaylist";
import AddVideo from "./components/Overlays/AddVideo";
import { useDispatch, useSelector } from "react-redux";
import { getUserPlaylists } from "./actions";
import Profile from "./components/Overlays/Profile";
import RenderVideo from "./components/RenderVideo";
import DeletePlaylist from "./components/Overlays/DeletePlaylist";
import AcceptTerms from "./components/Overlays/AcceptTerms";

export default function Dashboard() {
  const userPlaylists =
    useSelector((state: any) => state.userPlaylists.userPlaylists) ?? [];

  const currentPlaylist = useSelector(
    (state: any) => state.userPlaylists.currentPlaylist
  );

  useEffect(() => {
    document.body.style.backgroundColor = "#18181A";
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPlaylists());
  }, []);

  return (
    <div className={styles.Dashboard}>
      <Navigation />

      <RenderVideo />

      <div className="block lg:hidden">
        <Playlist userPlaylists={userPlaylists} />
      </div>

      <CreatePlaylist />
      <AddVideo />
      <Profile />
      <DeletePlaylist />
      <AcceptTerms />
    </div>
  );
}
