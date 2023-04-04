import { Fragment, useState } from "react";
import { Switch, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  postAddMedia,
  postDeleteMedia,
  postLambdaMedia,
  setAddVideoModal,
  setLambdaMedia,
} from "../../actions";
import Icon from "../../../../components/Icon";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import OverlayModal from "../../../../components/OverlayModal/OverlayModal";
import PlaylistItem from "../../../../components/PlaylistItem";

export default function AddVideo() {
  const [videoURL, setVideoURL] = useState<string>("");
  const [isNsfw, setNsfw] = useState(false);

  const dispatch = useDispatch();

  const isModalOpen = useSelector((state: any) => state.modal.addVideoModal);
  const lambdaLoader = useSelector((state: any) => state.loaders.lambdaLoader);
  const lambdaMedia = useSelector((state: any) => state.media.lambdaMedia);
  const addMediaLoader = useSelector(
    (state: any) => state.loaders.addMediaLoader
  );
  const currentPlaylist = useSelector(
    (state: any) => state.userPlaylists.currentPlaylist
  );

  const getVideo = () => {
    dispatch(
      postLambdaMedia({
        playlist_id: currentPlaylist.playlist_id,
        og_url: videoURL,
        is_nsfw: isNsfw,
      })
    );
  };

  const onClose = () => {
    dispatch(setLambdaMedia(null));
    dispatch(setAddVideoModal(false));
    setVideoURL("");
  };

  const editSearch = () => {
    dispatch(setLambdaMedia(null));
  };

  const _initialView = () => (
    <OverlayModal
      title="Add new video"
      desc="Find supported videos from any link."
      open={isModalOpen}
      onClose={onClose}
    >
      <>
        <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-5 !my-5 pb-5">
          <Input
            type="text"
            placeholder="Paste video url"
            required
            withLabel={false}
            className="!m-0 !h-[35px]"
            wrapperStyle="!m-0 w-full"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
          />
          <div className="w-full lg:w-auto lg:block flex place-content-end">
            <Button
              title="Find"
              onClick={getVideo}
              loading={lambdaLoader}
              color="primary"
              className="!w-[82px] !capitalize"
            />
          </div>
        </div>

        <div className="flex items-center">
          <h1 className="mr-4 text-xs font-normal">NSFW</h1>
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
        </div>
      </>
    </OverlayModal>
  );

  const _resultsView = () => (
    <OverlayModal
      title="Videos"
      desc="Find supported videos from any link."
      open={isModalOpen}
      onClose={onClose}
      innerLayoutStyles="!mt-5 lg:mt-0"
      appendContent={
        <button
          className="flex items-center gap-3 mr-0 lg:mr-5"
          onClick={editSearch}
        >
          <Icon name="search-icon" />
          <p className="text-[#ffffffcc] text-sm">Edit search</p>
        </button>
      }
    >
      <div className="!mb-0 pb-5 pr-5 max-h-96 overflow-auto">
        {lambdaMedia &&
          lambdaMedia.results.map((i: any) => (
            <PlaylistItem
              key={i._id}
              title={i.title}
              link={i.source}
              desc={i.description}
              searchItem
              onDelete={() =>
                dispatch(postDeleteMedia({ media_id: i.media_id }))
              }
              onAdd={() =>
                dispatch(
                  postAddMedia({
                    ...i,
                    playlist_id: currentPlaylist.playlist_id,
                  })
                )
              }
              isAddLoading={addMediaLoader}
            />
          ))}
      </div>
    </OverlayModal>
  );

  return lambdaMedia?.status === "Success" && lambdaMedia?.results.length > 0
    ? _resultsView()
    : _initialView();
}
