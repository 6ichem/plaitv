import { useDispatch, useSelector } from "react-redux";
import { setNewPlaylistModal } from "../../actions";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import OverlayModal from "../../../../components/OverlayModal/OverlayModal";

export default function CreatePlaylist() {
  const dispatch = useDispatch();

  const isModalOpen = useSelector((state: any) => state.modal.newPlaylistModal);

  return (
    <OverlayModal
      title="Create new playlist"
      open={isModalOpen}
      onClose={() => dispatch(setNewPlaylistModal(false))}
    >
      <div>
        <Input
          type="email"
          placeholder="Email"
          className="mb-5"
          required
          withLabel={false}
        />
        <Input
          type="password"
          placeholder="Password"
          className="mb-8"
          required
          withLabel={false}
        />
        <div className="flex place-content-end">
          <Button
            title="Create"
            color="primary"
            className="!w-[82px] !capitalize !font-bold !text-white"
          />
        </div>
      </div>
    </OverlayModal>
  );
}
