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
import { Switch, Tooltip } from "@mui/material";
import Icon from "../../../../components/Icon";

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

  const ToogleNSFW = () => (
    <div className="flex items-center">
      <h1 className="mr-4 text-xs font-normal">NSFW</h1>

      <Tooltip
        title="Content not suitable for minors must be clearly marked or will be removed."
        placement="top"
      >
        <div>
          <Icon name="info" />
        </div>
      </Tooltip>
      <Switch
        color="warning"
        checked={isNsfw}
        onChange={(e) => setNsfw(e.target.checked)}
      />
    </div>
  );

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

        <ToogleNSFW />

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
