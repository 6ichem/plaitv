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

export default function CreatePlaylist() {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const isModalOpen = useSelector((state: any) => state.modal.newPlaylistModal);
  const newPlaylistData = useSelector(
    (state: any) => state.userPlaylists.newPlaylist
  );

  const newPlaylist = () => {
    setLoading(true);
    dispatch(
      postNewPlaylist({
        title,
        description,
      })
    );
  };

  useEffect(() => {
    if (newPlaylistData && "playlist_id" in newPlaylistData) {
      dispatch(getUserPlaylists());

      setLoading(false);

      toast.success("Playlist created", {
        style: { background: "#333", color: "#fff" },
      });

      dispatch(setNewPlaylistModal(false));
    }
  }, [newPlaylistData]);

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
