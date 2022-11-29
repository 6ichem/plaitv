import Icon from "../../../../components/Icon";
import styles from "./Playlist.module.scss";
import PlaylistItem from "../../../../components/PlaylistItem";
import { Fragment, ReactNode, useEffect, useState } from "react";
import Input from "../../../../components/Input";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistMedia, setAddVideoModal } from "../../actions";
import Loader from "../../../../components/Loader";

export default function Playlist({ userPlaylists }: any) {
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const currentPlaylist = useSelector(
    (state: any) => state.userPlaylists.currentPlaylist
  );

  const playlistMedia = useSelector(
    (state: any) => state.userPlaylists.playlistMedia
  );

  const newPlaylistData = useSelector(
    (state: any) => state.userPlaylists.newPlaylist
  );

  const _editView = () => (
    <Transition
      show={isEdit}
      as={Fragment}
      enter="transition duration-700 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-700 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <div>
        <div className={styles.Playlist__Edit}>
          <button>
            <Icon name="save" />
          </button>
        </div>
        <Input
          type="text"
          placeholder="Name"
          className="mb-5"
          withLabel
          label="Name"
          required
        />
        <Input
          type="text"
          placeholder="Description (optional)"
          className="mb-5"
          withLabel
          label="Description (optional)"
          required
        />
      </div>
    </Transition>
  );

  const _listView = () =>
    !isEdit && (
      <div className={styles.Playlist__Header}>
        <span>Selected Playlist</span>
        <button onClick={() => setEdit(true)}>
          <Icon name="edit" />
          Edit
        </button>
      </div>
    );

  const _playlistView = () =>
    currentPlaylist && "playlist_id" in currentPlaylist ? (
      <>
        <div
          className={`${
            isEdit ? "flex justify-between items-center mb-5" : ""
          }`}
        >
          <span className={`${styles.descspan} ${!isEdit ? "mb-5" : ""}`}>
            Videos
          </span>
          <Transition
            show={isEdit}
            as={Fragment}
            enter="transition duration-700 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-700 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <button
              className={styles.descbutton}
              onClick={() => dispatch(setAddVideoModal(true))}
            >
              <Icon name="plus" />
              Add
            </button>
          </Transition>
        </div>
        <div className={styles.Playlist__Inner}>
          {playlistMedia &&
            playlistMedia.map((i: any) => (
              <PlaylistItem
                key={i.media_id}
                title={i.title}
                link={i.source}
                desc={i.description}
                active={true}
                isEditState={isEdit}
              />
            ))}
        </div>
      </>
    ) : (
      <div className={styles.Playlist__NoContent}>
        <button onClick={() => dispatch(setAddVideoModal(true))}>
          Add a video
        </button>
        to your playlist.
      </div>
    );

  const RenderContent: any = () =>
    isLoading ? (
      <div className="my-32">
        <Loader type="spinner" />
      </div>
    ) : (
      _playlistView()
    );

  useEffect(() => {
    if (currentPlaylist && "playlist_id" in currentPlaylist && playlistMedia)
      setLoading(false);
  }, [currentPlaylist, playlistMedia]);

  useEffect(() => {
    dispatch(getPlaylistMedia({ playlist_id: currentPlaylist?.playlist_id }));
  }, [currentPlaylist]);

  return (
    <div className={styles.Playlist}>
      {_editView()}
      {_listView()}
      <div className={`${styles.Playlist__Sub} ${isEdit ? "my-12" : ""}`}>
        {!isEdit && <h1 className={styles.title1}>{currentPlaylist?.title}</h1>}
        <RenderContent />
      </div>
    </div>
  );
}
