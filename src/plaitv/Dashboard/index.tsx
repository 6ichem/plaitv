import { useEffect } from "react";
import styles from "./Dashboard.module.scss";

import Navigation from "./components/Navigation";
import Playlist from "./components/Playlist";
import CreatePlaylist from "./components/Overlays/CreatePlaylist";
import AddVideo from "./components/Overlays/AddVideo";
import { useDispatch, useSelector } from "react-redux";
import { getUserPlaylists, setNsfwModal, setTermsModal } from "./actions";
import Profile from "./components/Overlays/Profile";
import RenderVideo from "./components/RenderVideo";
import DeletePlaylist from "./components/Overlays/DeletePlaylist";
import AcceptTerms from "./components/Overlays/AcceptTerms";
import { getLocalUser } from "../../http/utils";
import ChangePassword from "./components/Overlays/ChangePassword";
import DeleteAccount from "./components/Overlays/DeleteAccount";
import NSFWModal from "./components/Overlays/Nsfw";
import { getUser } from "../Auth/Login/actions";

export default function Dashboard() {
  const userPlaylists =
    useSelector((state: any) => state.userPlaylists.userPlaylists) ?? [];
  const currentPlaylist = useSelector(
    (state: any) => state.userPlaylists.currentPlaylist
  );
  const nsfwModal = useSelector((state: any) => state.modal.nsfwModal);

  const userData = JSON.parse(getLocalUser());

  useEffect(() => {
    document.body.style.backgroundColor = "#18181A";
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userData.terms_accepted) dispatch(getUserPlaylists());
    else dispatch(setTermsModal(true));
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className={styles.Dashboard}>
      {userData.terms_accepted ? (
        <>
          <Navigation />

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
      <ChangePassword />
      <DeleteAccount />
    </div>
  );
}
