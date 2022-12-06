import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Button";
import OverlayModal from "../../../../components/OverlayModal/OverlayModal";
import { deletePlaylist, setDeletePlaylistModal } from "../../actions";

export default function DeletePlaylist() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: any) => state.modal.deletePlaylistModal
  );

  const currentPlaylist = useSelector(
    (state: any) => state.userPlaylists.currentPlaylist
  );

  const isLoading = useSelector(
    (state: any) => state.loaders.deletePlaylistLoader
  );

  return (
    <OverlayModal
      title={`Are you sure you want to delete ${currentPlaylist?.title}?`}
      open={isModalOpen}
      onClose={() => dispatch(setDeletePlaylistModal(false))}
    >
      <div className="flex place-content-end gap-3">
        <Button
          type="submit"
          title="Delete"
          loading={isLoading}
          color="primary"
          className="!w-[82px] !capitalize !font-bold !text-white !bg-red-700"
          onClick={() => dispatch(deletePlaylist(currentPlaylist))}
        />
        <Button
          type="submit"
          title="Cancel"
          color="secondary"
          className="!w-[82px] !capitalize !font-bold !text-white rounded"
          onClick={() => dispatch(setDeletePlaylistModal(false))}
        />
      </div>
    </OverlayModal>
  );
}
