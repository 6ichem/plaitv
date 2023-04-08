import { useDispatch, useSelector } from "react-redux";
import {
  postChangePassword,
  setPasswordModal,
  setProfileModal,
} from "../../actions";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import OverlayModal from "../../../../components/OverlayModal/OverlayModal";
import { SyntheticEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const dispatch = useDispatch();

  const isModalOpen = useSelector(
    (state: any) => state.modal.changePasswordModal
  );
  const isLoading = useSelector(
    (state: any) => state.loaders.userProfileLoader
  );

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const updateProfile = (e: SyntheticEvent) => {
    e.preventDefault();

    if (newPassword === repeatPassword) {
      if (currentPassword.trim().length > 5) {
        dispatch(
          postChangePassword({
            current_password: currentPassword,
            new_password: newPassword,
          })
        );
      }
    } else {
      toast.error("New password and repeat password don't match!", {
        style: { background: "#333", color: "#fff" },
      });
    }
  };

  return (
    <OverlayModal
      title="Change password"
      open={isModalOpen}
      onClose={() => dispatch(setPasswordModal(false))}
      innerLayoutStyles="!mt-0"
    >
      <form onSubmit={(e) => updateProfile(e)}>
        <div className="!my-6">
          <h1 className="uppercase !text-[#ffffff33] !font-bold !text-xs !mb-2.5">
            Security
          </h1>
          <Input
            type="password"
            placeholder="Current password"
            className="mb-5"
            required
            withLabel={true}
            label="Current password"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="New password"
            className="mb-5"
            required
            withLabel={true}
            label="New password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Repeat new password"
            className="mb-5"
            required
            withLabel={true}
            label="Repeat new password"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>

        <div className="flex place-content-end">
          <Button
            type="submit"
            onClick={updateProfile}
            title="Save"
            loading={isLoading}
            color="primary"
            className="!w-[82px] !capitalize !font-bold !text-white"
          />
        </div>
      </form>
    </OverlayModal>
  );
}
