import Icon from "../../../../components/Icon";
import styles from "./Playlist.module.scss";
import PlaylistItem from "../../../../components/PlaylistItem";
import { Fragment, ReactNode, useEffect, useState } from "react";
import Input from "../../../../components/Input";
import { Menu, Switch, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMediaStatus,
  postDeleteMedia,
  postUpdatePlaylist,
  setAddVideoModal,
  setCurrentMedia,
  setDeletePlaylistModal,
} from "../../actions";
import Loader from "../../../../components/Loader";
import Notifications from "./Notifications";
import { getLocalAccessToken } from "../../../../http/utils";

export default function Playlist({ userPlaylists, isPublicView = false }: any) {
  const dispatch = useDispatch();
  const isAuthenticated = getLocalAccessToken();

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
  const [isNsfw, setNsfw] = useState<boolean>(false);

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

  const updatePlaylistPrivacy = (value: boolean) => {
    dispatch(
      postUpdatePlaylist({
        ...playlistInfo,
        playlist_id: currentPlaylist.playlist_id,
        is_public: value,
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

        <div className="flex items-center">
          <h1 className="mr-4 text-xs font-normal text-white">NSFW</h1>
          <Switch
            checked={isNsfw}
            onChange={setNsfw}
            className={`${
              isNsfw ? "bg-[#CC8E45]" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                isNsfw ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          {/* <button
            className="text-[#ffffff80] text-sm"
            onClick={() => {
              dispatch(setDeletePlaylistModal(true));
              setEdit(false);
            }}
          >
            <span>Delete Playlist</span>
          </button> */}
        </div>
      </div>
    </Transition>
  );

  const _listView = () =>
    !isEdit && (
      <div className={styles.Playlist__Header}>
        {!isLoading && (
          <>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  className={`flex font-bold uppercase !text-black items-center w-full justify-center rounded-full px-5 py-2 text-sm ${
                    !currentPlaylist.is_public
                      ? "bg-white bg-opacity-50"
                      : "bg-[#50E856]"
                  }`}
                >
                  {currentPlaylist.is_public ? "Public" : "Private"}
                  <Icon name="arrow-down" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-10 mt-1.5 left-0 w-56 origin-top-right rounded-md bg-secondary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                  <div
                    className="text-sm"
                    style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    <Menu.Item>
                      <button
                        onClick={() => {
                          updatePlaylistPrivacy(true);
                        }}
                        className="flex w-full items-center rounded-md px-4 py-3 text-sm hover:bg-tertiary"
                      >
                        Public
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        onClick={() => {
                          updatePlaylistPrivacy(false);
                        }}
                        className="flex w-full items-center rounded-md px-4 py-3 text-sm hover:bg-tertiary"
                      >
                        Private
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <div className="flex items-center">
              <Notifications />
              <button onClick={() => setEdit(true)}>
                <Icon name="edit" />
                Edit
              </button>
            </div>
          </>
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

          {!isPublicView && (
            <button
              className={styles.descbutton}
              onClick={() => dispatch(setAddVideoModal(true))}
            >
              <Icon name="plus" />
              Add
            </button>
          )}
        </div>
        <div className="max-h-[75vh] overflow-y-scroll pr-2">
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
                thumbnail={i.image}
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

  useEffect(() => {
    if (isAuthenticated) {
      if (currentPlaylist && "playlist_id" in currentPlaylist && !isLoading)
        dispatch(getMediaStatus());
    }
  }, [currentPlaylist, isLoading]);

  return (
    <div className={styles.Playlist}>
      {!isPublicView && _editView()}
      {!isPublicView && _listView()}
      <div className={`${styles.Playlist__Sub} ${isEdit ? "my-12" : ""}`}>
        {!isEdit && currentPlaylist && !isPublicView && (
          <div
            className={`${
              (isEdit && "flex justify-between items-center") || ""
            } my-7`}
          >
            <h1 className={styles.title1}>{currentPlaylist?.title}</h1>
          </div>
        )}
        <RenderContent />
      </div>
    </div>
  );
}
