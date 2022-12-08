import Icon from "../../../../components/Icon";
import styles from "./Playlist.module.scss";
import PlaylistItem from "../../../../components/PlaylistItem";
import { Fragment, ReactNode, useEffect, useState } from "react";
import Input from "../../../../components/Input";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  postDeleteMedia,
  postUpdatePlaylist,
  setAddVideoModal,
  setCurrentMedia,
  setDeletePlaylistModal,
} from "../../actions";
import Loader from "../../../../components/Loader";

export default function Playlist({ userPlaylists }: any) {
  const dispatch = useDispatch();

  const currentPlaylist = useSelector(
    (state: any) => state.userPlaylists.currentPlaylist
  );
  const playlistMedia = useSelector(
    (state: any) => state.userPlaylists.playlistMedia
  );
  const deleteMediaLoader = useSelector(
    (state: any) => state.loaders.deleteMediaLoader
  );
  const currentMedia = useSelector((state: any) => state.media.currentMedia);

  const [isEdit, setEdit] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isEditLoading, setEditLoading] = useState<boolean>(false);

  const [playlistInfo, setPlaylistInfo] = useState({
    title: "",
    description: "",
  });

  const updatePlaylist = () => {
    setEditLoading(true);

    dispatch(
      postUpdatePlaylist({
        ...playlistInfo,
        playlist_id: currentPlaylist.playlist_id,
      })
    );
  };

  const chooseMedia = (item: any) => {
    if (item.media_id !== currentMedia.media_id) {
      dispatch(setCurrentMedia(item));
    }
  };

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
          {isEditLoading ? (
            <div className="pt-3 pr-5">
              <Loader />
            </div>
          ) : (
            <button onClick={updatePlaylist}>
              <Icon name="save" />
            </button>
          )}
        </div>
        <Input
          type="text"
          placeholder="Name"
          className="mb-5"
          withLabel
          label="Name"
          required
          value={playlistInfo.title}
          onChange={(e) =>
            setPlaylistInfo({ ...playlistInfo, title: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="Description (optional)"
          className="mb-5"
          withLabel
          label="Description (optional)"
          required
          value={playlistInfo.description}
          onChange={(e) =>
            setPlaylistInfo({ ...playlistInfo, description: e.target.value })
          }
        />

        <div className="flex place-content-end">
          <button
            className="text-[#ffffff80] text-sm"
            onClick={() => dispatch(setDeletePlaylistModal(true))}
          >
            <span>Delete Playlist</span>
          </button>
        </div>
      </div>
    </Transition>
  );

  const _listView = () =>
    !isEdit && (
      <div className={styles.Playlist__Header}>
        <span>Selected Playlist</span>
        {!isLoading && (
          <button onClick={() => setEdit(true)}>
            <Icon name="edit" />
            Edit
          </button>
        )}
      </div>
    );

  const _playlistView = () =>
    currentPlaylist &&
    "playlist_id" in currentPlaylist &&
    playlistMedia &&
    playlistMedia.length > 0 ? (
      <>
        <div className="flex justify-between items-center mb-12">
          <span className={styles.descspan}>Videos</span>

          <button
            className={styles.descbutton}
            onClick={() => dispatch(setAddVideoModal(true))}
          >
            <Icon name="plus" />
            Add
          </button>
        </div>
        <div className={styles.Playlist__Inner}>
          {playlistMedia &&
            playlistMedia.map((i: any) => (
              <PlaylistItem
                key={i.media_id}
                title={i.title}
                link={i.source}
                desc={i.description}
                active={currentMedia.media_id === i.media_id}
                isEditState={isEdit}
                onDelete={() =>
                  dispatch(
                    postDeleteMedia({ media_id: i.media_id, title: i.title })
                  )
                }
                onClick={() => chooseMedia(i)}
                isDeleteLoading={deleteMediaLoader}
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
    if (currentPlaylist && "playlist_id" in currentPlaylist && playlistMedia) {
      dispatch(setCurrentMedia(playlistMedia[0]));
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [currentPlaylist, playlistMedia]);

  useEffect(() => {
    setPlaylistInfo({
      ...playlistInfo,
      title: currentPlaylist?.title,
      description: currentPlaylist?.description,
    });

    if (isEdit) setEdit(false);
    if (isEditLoading) setEditLoading(false);
  }, [currentPlaylist]);

  return (
    <div className={styles.Playlist}>
      {_editView()}
      {_listView()}
      <div className={`${styles.Playlist__Sub} ${isEdit ? "my-12" : ""}`}>
        {!isEdit && currentPlaylist && (
          <div
            className={`${
              (isEdit && "flex justify-between items-center") || ""
            }my-7`}
          >
            <h1 className={styles.title1}>{currentPlaylist?.title}</h1>
          </div>
        )}
        <RenderContent />
      </div>
    </div>
  );
}
