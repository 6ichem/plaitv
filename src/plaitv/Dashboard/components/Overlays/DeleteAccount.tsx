import { useDispatch, useSelector } from "react-redux";
import {
  deleteAccount,
  postChangePassword,
  setDeleteAccountModal,
  setPasswordModal,
  setProfileModal,
} from "../../actions";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import OverlayModal from "../../../../components/OverlayModal/OverlayModal";
import { SyntheticEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DeleteAccount() {
  const dispatch = useDispatch();

  const isModalOpen = useSelector(
    (state: any) => state.modal.deleteAccountModal
  );
  const isLoading = useSelector(
    (state: any) => state.loaders.userProfileLoader
  );

  const [currentPassword, setCurrentPassword] = useState<string>("");

  const updateProfile = (e: SyntheticEvent) => {
    e.preventDefault();

    if (currentPassword.trim().length > 5) {
      dispatch(
        deleteAccount({
          password: currentPassword,
        })
      );
    }
  };

  return (
    <OverlayModal
      title="Delete account"
      open={isModalOpen}
      desc="Permanently delete my account and all my data."
      onClose={() => dispatch(setDeleteAccountModal(false))}
      innerLayoutStyles="!mt-0"
    >
      <form onSubmit={(e) => updateProfile(e)}>
        <div className="!my-6">
          <Input
            type="password"
            placeholder="Current password"
            className="mb-5"
            required
            withLabel={false}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="flex place-content-end">
          <Button
            type="submit"
            onClick={updateProfile}
            title="Delete"
            loading={isLoading}
            color="primary"
            className="!w-[82px] !capitalize !font-bold !bg-[#C83C44] !text-white"
          />
        </div>
      </form>
    </OverlayModal>
  );
}
