import { useDispatch, useSelector } from "react-redux";
import {
  postChangePassword,
  postUpdateUserProfile,
  setNewPlaylistModal,
  setProfileModal,
} from "../../actions";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import OverlayModal from "../../../../components/OverlayModal/OverlayModal";
import { getLocalUser } from "../../../../http/utils";
import { SyntheticEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const dispatch = useDispatch();

  const isModalOpen = useSelector((state: any) => state.modal.profileModal);
  const isLoading = useSelector(
    (state: any) => state.loaders.userProfileLoader
  );

  const userData = JSON.parse(getLocalUser());

  const { email, first_name, last_name } = userData;

  const [firstName, setFirstName] = useState<string>(first_name);
  const [lastName, setLastName] = useState<string>(last_name);

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const updateProfile = (e: SyntheticEvent) => {
    e.preventDefault();

    if (firstName !== first_name || lastName !== last_name) {
      dispatch(
        postUpdateUserProfile({
          first_name: firstName,
          last_name: lastName,
        })
      );
    }

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
      title="Profile"
      open={isModalOpen}
      onClose={() => dispatch(setProfileModal(false))}
      innerLayoutStyles="!mt-0"
    >
      <form onSubmit={(e) => updateProfile(e)}>
        <div>
          <h1 className="uppercase !text-[#ffffff33] !font-bold !text-xs !mb-2.5">
            Details
          </h1>
          <Input
            type="email"
            placeholder="Email"
            className="mb-5"
            required
            withLabel={true}
            label="Email"
            disabled
            value={email}
          />
          <Input
            type="text"
            placeholder="First name (optional)"
            className="mb-5"
            required
            withLabel={true}
            label="First name (optional)"
            value={firstName ?? ""}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Last name (optional)"
            className="mb-5"
            required
            withLabel={true}
            label="Last name (optional)"
            value={lastName ?? ""}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
