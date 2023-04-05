import { ChangeEvent, Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import { Switch, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  findMedia,
  postAddMedia,
  postDeleteMedia,
  setAddVideoModal,
  uploadVideo,
} from "../../actions";
import Icon from "../../../../components/Icon";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import OverlayModal from "../../../../components/OverlayModal/OverlayModal";
import PlaylistItem from "../../../../components/PlaylistItem";

export default function AddVideo() {
  const [videoURL, setVideoURL] = useState<string>("");
  const [isNsfw, setNsfw] = useState(false);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoDescription, setVideoDescription] = useState<string>("");

  const dispatch = useDispatch();

  const isModalOpen = useSelector((state: any) => state.modal.addVideoModal);
  const addMediaLoader = useSelector(
    (state: any) => state.loaders.addMediaLoader
  );
  const currentPlaylist = useSelector(
    (state: any) => state.userPlaylists.currentPlaylist
  );

  const getVideo = () => {
    dispatch(
      findMedia({
        playlist_id: currentPlaylist.playlist_id,
        og_url: videoURL,
        is_nsfw: isNsfw,
      })
    );
  };

  const onClose = () => {
    dispatch(setAddVideoModal(false));
    setVideoURL("");
  };

  const _initialView = () => (
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

        <div className="justify-end w-full flex">
          <div className="w-full lg:w-auto lg:block flex place-content-end">
            <Button
              title="Find"
              onClick={getVideo}
              loading={addMediaLoader}
              color="primary"
              className="!w-[82px] !capitalize"
            />
          </div>
        </div>
      </div>
    </>
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileSelectedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const fileUploadHandler = () => {
    if (selectedFile) {
      dispatch(
        uploadVideo({
          playlist_id: currentPlaylist.playlist_id,
          title: videoTitle,
          description: videoDescription,
          is_nsfw: isNsfw,
          file: selectedFile,
        })
      );
    }
  };
  const _fromURL = () => (
    <>
      <div className="flex flex-col lg:justify-between items-center gap-5 !my-5 pb-5">
        <Input
          type="file"
          placeholder="Select mp4 from device"
          required
          withLabel={false}
          className="!m-0 !h-auto"
          wrapperStyle="!m-0 w-full"
          onChange={fileSelectedHandler}
        />
        <Input
          type="text"
          placeholder="Select mp4 from device"
          required
          label="Title (required)"
          className="!m-0 !h-auto"
          wrapperStyle="!m-0 w-full"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Select mp4 from device"
          required
          label="Description (required)"
          className="!m-0 !h-auto"
          wrapperStyle="!m-0 w-full"
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)}
        />
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

      <div className="justify-end w-full flex">
        <div className="w-full lg:w-auto lg:block flex place-content-end">
          <Button
            title="Upload"
            onClick={fileUploadHandler}
            loading={addMediaLoader}
            color="primary"
            className="!w-[82px] !capitalize"
          />
        </div>
      </div>
    </>
  );

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const tabs = ["From URL", "Upload"];

  return (
    <OverlayModal
      title="Add new video"
      desc="Find supported videos from any link."
      open={isModalOpen}
      onClose={onClose}
    >
      <Tab.Group>
        <Tab.List className="flex gap-5 space-x-1 p-1">
          {tabs.map((tab, idx) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                classNames(
                  "py-2.5 text-sm font-bold leading-5",
                  "focus:outline-none",
                  selected
                    ? "border-b-[3px] border-[#CC8E45] text-white text-opacity-80"
                    : "text-white text-opacity-20"
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {tabs.map((tab, idx) => (
            <Tab.Panel key={idx}>
              {idx == 0 ? _initialView() : _fromURL()}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </OverlayModal>
  );
}
