import { useEffect, useState } from "react";
import styles from "../../Dashboard/Dashboard.module.scss";

import Navigation from "../../Dashboard/components/Navigation";
import Playlist from "../../Dashboard/components/Playlist";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentPlaylist } from "../../Dashboard/actions";
import RenderVideo from "../../Dashboard/components/RenderVideo";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import {
  findUserPlaylists,
  getPublicPlaylistMedia,
  setFoundProfile,
} from "../actions";

export default function PublicPlaylistView() {
  const [isLoading, setIsLoading] = useState(true);
  const { playlistId, userId } = useParams();

  const userPlaylists =
    useSelector((state: any) => state.userPlaylists.userPlaylists) ?? [];

  const currentPlaylist = useSelector(
    (state: any) => state.userPlaylists.currentPlaylist
  );

  const foundProfilePlaylists = useSelector(
    (state: any) => state.explore.foundProfilePlaylists
  );

  useEffect(() => {
    dispatch(
      setFoundProfile({
        username: userId,
      })
    );

    dispatch(findUserPlaylists(userId));
  }, []);

  useEffect(() => {
    if (foundProfilePlaylists && foundProfilePlaylists.length > 0) {
      const findPlaylist = foundProfilePlaylists.find(
        (i: any) => (i.playlist_id = playlistId)
      );

      dispatch(setCurrentPlaylist(findPlaylist));
    }
  }, [foundProfilePlaylists]);

  useEffect(() => {
    dispatch(
      getPublicPlaylistMedia({ username: userId, playlist_id: playlistId })
    );

    setIsLoading(false);
  }, [currentPlaylist]);

  useEffect(() => {
    document.body.style.backgroundColor = "#18181A";
  }, []);

  const dispatch = useDispatch();

  return (
    <div className={styles.Dashboard}>
      {isLoading ? (
        <Loader type="spinner" />
      ) : (
        <>
          <>
            <Navigation isPublicView={true} />

            <RenderVideo />

            <div className="block lg:hidden">
              <Playlist userPlaylists={userPlaylists} />
            </div>
          </>
        </>
      )}
    </div>
  );
}
