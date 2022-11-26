import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setAddVideoModal } from "../../actions";
import Icon from "../../../../components/Icon";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import OverlayModal from "../../../../components/OverlayModal/OverlayModal";
import PlaylistItem from "../../../../components/PlaylistItem";

export default function AddVideo() {
  const [foundResults, setFoundResults] = useState<boolean>(false);
  const dispatch = useDispatch();

  const isModalOpen = useSelector((state: any) => state.modal.addVideoModal);

  const _initialView = () => (
    <OverlayModal
      title="Add new video"
      desc="Find supported videos from any link."
      open={isModalOpen}
      onClose={() => dispatch(setAddVideoModal(false))}
    >
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-5 !my-5 pb-5">
        <Input
          type="text"
          placeholder="Paste video url"
          required
          withLabel={false}
          className="!m-0 !h-[35px]"
          wrapperStyle="!m-0 w-full"
        />
        <div className="w-full md:w-auto md:block flex place-content-end">
          <Button
            title="Find"
            onClick={() => setFoundResults(true)}
            color="primary"
            className="!w-[82px] !capitalize"
          />
        </div>
      </div>
    </OverlayModal>
  );

  const _resultsView = () => (
    <OverlayModal
      title="Videos"
      desc="Find supported videos from any link."
      open={isModalOpen}
      onClose={() => dispatch(setAddVideoModal(false))}
      innerLayoutStyles="!mt-5 md:mt-0"
      appendContent={
        <button
          className="flex items-center gap-3 mr-0 md:mr-5"
          onClick={() => setFoundResults(false)}
        >
          <Icon name="search-icon" />
          <p className="text-[#ffffffcc] text-sm">Edit search</p>
        </button>
      }
    >
      <div className="!mb-0 pb-5 pr-5 max-h-96 overflow-auto">
        <PlaylistItem
          title="React Admin Panel Tutorial | React Admin Dashboard Template Design"
          link="youtube.com"
          desc="React admin dashboard from scratch for beginners. React Admin Panel
      UI. Get Hostinger Discount: http://hostinger.com/lamadev Coupon Code:
      LAMADEV If it is valuable to you, you can support Lama Dev. Show more"
          searchItem
        />
        <PlaylistItem
          title="React Admin Panel Tutorial | React Admin Dashboard Template Design"
          link="youtube.com"
          searchItem
        />
        <PlaylistItem
          title="React Admin Panel Tutorial | React Admin Dashboard Template Design"
          link="youtube.com"
          searchItem
        />
        <PlaylistItem
          title="React Admin Panel Tutorial | React Admin Dashboard Template Design"
          link="youtube.com"
          searchItem
        />
        <PlaylistItem
          title="React Admin Panel Tutorial | React Admin Dashboard Template Design"
          link="youtube.com"
          searchItem
        />
        <PlaylistItem
          title="React Admin Panel Tutorial | React Admin Dashboard Template Design"
          link="youtube.com"
          searchItem
        />
        <PlaylistItem
          title="React Admin Panel Tutorial | React Admin Dashboard Template Design"
          link="youtube.com"
          searchItem
        />
        <PlaylistItem
          title="React Admin Panel Tutorial | React Admin Dashboard Template Design"
          link="youtube.com"
          searchItem
        />
        <PlaylistItem
          title="React Admin Panel Tutorial | React Admin Dashboard Template Design"
          link="youtube.com"
          searchItem
        />
        <PlaylistItem
          title="React Admin Panel Tutorial | React Admin Dashboard Template Design"
          link="youtube.com"
          searchItem
        />
      </div>
    </OverlayModal>
  );

  return foundResults ? _resultsView() : _initialView();
}
