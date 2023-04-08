import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Button";
import Loader from "../../../../components/Loader";
import OverlayModal from "../../../../components/OverlayModal/OverlayModal";
import { httpGetTerms } from "../../../../http/api/users";
import {
  deletePlaylist,
  postUpdateUserProfile,
  setDeletePlaylistModal,
  setNsfwModal,
  setTermsModal,
} from "../../actions";

export default function NSFWModal() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: any) => state.modal.nsfwModal);
  const [isLoading, setLoading] = useState(false);

  const acceptTerms = (choice: boolean) => {
    if (choice) {
      dispatch(setNsfwModal(false));
    }
  };

  return (
    <OverlayModal
      title="You must be 18+ to view this playlist."
      open={isModalOpen}
      onClose={() => {
        return;
      }}
      innerContentStyles="!mt-[16px]"
    >
      <>
        <span className="text-white text-opacity-40 text-sm mt-0">
          You must be at least eighteen years old to view this content. Do you
          confirm you are over eighteen and willing to see content not suitable
          for minors?
        </span>
        <div className="flex items-center place-content-end gap-3">
          <Button
            type="submit"
            title="No"
            color="primary"
            className="!w-[82px] !capitalize !font-bold !text-white rounded mt-7"
            onClick={() => acceptTerms(false)}
            loading={isLoading}
          />
          <Button
            type="submit"
            title="Yes"
            color="primary"
            className="!w-[82px] !capitalize !font-bold !text-white rounded mt-7 !bg-transparent border-[0.5px] border-[#CC8E45]"
            onClick={() => acceptTerms(true)}
            loading={isLoading}
          />
        </div>
      </>
    </OverlayModal>
  );
}
