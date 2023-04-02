import { useEffect } from "react";
import styles from "../../Dashboard/Dashboard.module.scss";

import Navigation from "../../Dashboard/components/Navigation";
import Playlist from "../../Dashboard/components/Playlist";
import CreatePlaylist from "../../Dashboard/components/Overlays/CreatePlaylist";
import AddVideo from "../../Dashboard/components/Overlays/AddVideo";
import { useDispatch, useSelector } from "react-redux";
import { getUserPlaylists, setTermsModal } from "../../Dashboard/actions";
import Profile from "../../Dashboard/components/Overlays/Profile";
import RenderVideo from "../../Dashboard/components/RenderVideo";
import DeletePlaylist from "../../Dashboard/components/Overlays/DeletePlaylist";
import AcceptTerms from "../../Dashboard/components/Overlays/AcceptTerms";
import { getLocalUser } from "../../../http/utils";

export default function PublicPlaylistView() {
  const userPlaylists =
    useSelector((state: any) => state.userPlaylists.userPlaylists) ?? [];

  const currentPlaylist = useSelector(
    (state: any) => state.userPlaylists.currentPlaylist
  );

  const foundProfile = useSelector((state: any) => state.explore.foundProfile);

  const userData = JSON.parse(getLocalUser());

  if (!currentPlaylist && !foundProfile) {
    window.location.href = "/";
  }

  useEffect(() => {
    document.body.style.backgroundColor = "#18181A";
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userData.terms_accepted) dispatch(getUserPlaylists());
    else dispatch(setTermsModal(true));
  }, []);

  return (
    <div className={styles.Dashboard}>
      {userData.terms_accepted ? (
        <>
          <Navigation isPublicView={true} />

          <RenderVideo />

          <div className="block lg:hidden">
            <Playlist userPlaylists={userPlaylists} />
          </div>
        </>
      ) : (
        <AcceptTerms />
      )}

      <CreatePlaylist />
      <AddVideo />
      <Profile />
      <DeletePlaylist />
    </div>
  );
}
