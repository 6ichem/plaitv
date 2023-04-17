import { useDispatch, useSelector } from "react-redux";
import {
  getUserPlaylists,
  postNewPlaylist,
  setNewPlaylistModal,
} from "../../actions";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import OverlayModal from "../../../../components/OverlayModal/OverlayModal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Switch } from "@headlessui/react";

export default function CreatePlaylist() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isNsfw, setNsfw] = useState(false);

  const isModalOpen = useSelector((state: any) => state.modal.newPlaylistModal);
  const newPlaylistData = useSelector(
    (state: any) => state.userPlaylists.newPlaylist
  );
  const isLoading = useSelector(
    (state: any) => state.loaders.createPlaylistLoader
  );

  const newPlaylist = () => {
    dispatch(
      postNewPlaylist({
        title,
        description,
        is_nsfw: isNsfw,
      })
    );
  };

  return (
    <OverlayModal
      title="Create new playlist"
      open={isModalOpen}
      onClose={() => dispatch(setNewPlaylistModal(false))}
    >
      <div>
        <Input
          type="text"
          placeholder="Name"
          className="mb-5"
          required
          withLabel={false}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Description"
          className="mb-8"
          required
          withLabel={false}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex items-center">
          <h1 className="mr-4 text-xs font-normal">NSFW</h1>
          <Switch
            checked={isNsfw}
            onChange={setNsfw}
            className={`${
              isNsfw ? "bg-[#CC8E45]" : "bg-white bg-opacity-20"
            } relative inline-flex h-6 lg:w-11 items-center rounded-full`}
          >
            <span
              className={`${
                isNsfw ? "translate-x-6" : "translate-x-1 bg-[#787878]"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        <div className="flex place-content-end">
          <Button
            loading={isLoading}
            type="submit"
            onClick={newPlaylist}
            title="Create"
            color="primary"
            className="!w-[82px] !capitalize !font-bold !text-white"
          />
        </div>
      </div>
    </OverlayModal>
  );
}
