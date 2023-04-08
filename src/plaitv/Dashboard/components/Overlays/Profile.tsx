import { useDispatch, useSelector } from "react-redux";
import {
  postChangePassword,
  postUpdateUserProfile,
  setDeleteAccountModal,
  setNewPlaylistModal,
  setPasswordModal,
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

  const {
    email,
    first_name,
    last_name,
    username: profileUsername,
    profile_description,
  } = userData;

  const [firstName, setFirstName] = useState<string>(first_name);
  const [lastName, setLastName] = useState<string>(last_name);
  const [username, setUsername] = useState<string>(profileUsername);
  const [description, setDescription] = useState<string>(profile_description);

  const updateProfile = (e: SyntheticEvent) => {
    e.preventDefault();

    if (
      firstName !== first_name ||
      lastName !== last_name ||
      username !== profileUsername ||
      description !== profile_description
    ) {
      dispatch(
        postUpdateUserProfile({
          first_name: firstName,
          last_name: lastName,
          username,
          profile_description: description,
        })
      );
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
          <Input
            type="text"
            placeholder="Username"
            className="mb-5"
            required
            withLabel={true}
            label="Username"
            value={username ?? ""}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Profile description (optional)"
            className="mb-5"
            required
            withLabel={true}
            label="Profile description (optional)"
            value={description ?? ""}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="!my-6 flex flex-col gap-3">
          <h1 className="uppercase !text-[#ffffff33] !font-bold !text-xs !mb-2.5">
            Options
          </h1>
          <button
            className="text-[#CC8E45] font-bold text-sm w-32 justify-start text-left"
            onClick={() => {
              dispatch(setProfileModal(false));
              dispatch(setPasswordModal(true));
            }}
          >
            Change password
          </button>
          <button
            className="text-[#C83C44] font-bold text-sm w-28 justify-start text-left"
            onClick={() => {
              dispatch(setProfileModal(false));
              dispatch(setDeleteAccountModal(true));
            }}
          >
            Delete account
          </button>
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
