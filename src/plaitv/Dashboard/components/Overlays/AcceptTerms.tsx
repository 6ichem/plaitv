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
  setTermsModal,
} from "../../actions";

export default function AcceptTerms() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: any) => state.modal.acceptTermsModal);
  const [terms, setTerms] = useState<any>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    httpGetTerms().then((r) => setTerms(r.toString()));
  }, []);

  const currentPlaylist = useSelector(
    (state: any) => state.userPlaylists.currentPlaylist
  );

  const acceptTerms = () => {
    setLoading(true);

    dispatch(
      postUpdateUserProfile({
        terms_accepted: true,
      })
    );

    setLoading(false);

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  return (
    <OverlayModal
      title="Before you continue to Plai.tv"
      open={isModalOpen}
      onClose={() => {
        return;
      }}
    >
      <>
        {terms ? (
          <div
            className="bg-[#262628] p-5 text-white border border-[#181819] rounded-[3px] overflow-y-scroll max-h-[501px]"
            dangerouslySetInnerHTML={{ __html: terms }}
          />
        ) : (
          <Loader type="spinner" />
        )}

        <div className="flex place-content-end gap-3">
          <Button
            type="submit"
            title="Accept"
            color="primary"
            className="!w-[82px] !capitalize !font-bold !text-white rounded mt-7"
            onClick={acceptTerms}
            loading={isLoading}
          />
        </div>
      </>
    </OverlayModal>
  );
}
