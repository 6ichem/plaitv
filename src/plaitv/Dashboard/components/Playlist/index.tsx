import Icon from "../../../../components/Icon";
import styles from "./Playlist.module.scss";
import PlaylistItem from "../../../../components/PlaylistItem";
import { Fragment, useState } from "react";
import Input from "../../../../components/Input";
import { Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { setAddVideoModal } from "../../actions";

export default function Playlist() {
  const [isEdit, setEdit] = useState<boolean>(false);
  const dispatch = useDispatch();

  const _editView = () => (
    <Transition
      show={isEdit}
      as={Fragment}
      enter="transition duration-700 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-700 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <div>
        <div className={styles.Playlist__Edit}>
          <button>
            <Icon name="save" />
          </button>
        </div>
        <Input
          type="text"
          placeholder="Name"
          className="mb-5"
          withLabel
          label="Name"
          required
        />
        <Input
          type="text"
          placeholder="Description (optional)"
          className="mb-5"
          withLabel
          label="Description (optional)"
          required
        />
      </div>
    </Transition>
  );

  const _listView = () =>
    !isEdit && (
      <div className={styles.Playlist__Header}>
        <span>Selected Playlist</span>
        <button onClick={() => setEdit(true)}>
          <Icon name="edit" />
          Edit
        </button>
      </div>
    );

  return (
    <div className={styles.Playlist}>
      {_editView()}
      {_listView()}
      <div className={`${styles.Playlist__Sub} ${isEdit ? "my-12" : ""}`}>
        {!isEdit && <h1>React tutorial playlist</h1>}
        <div className={`${isEdit ? "flex justify-between items-center" : ""}`}>
          <span className={`${!isEdit ? "mb-5" : ""}`}>Videos</span>
          <Transition
            show={isEdit}
            as={Fragment}
            enter="transition duration-700 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-700 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <button onClick={() => dispatch(setAddVideoModal(true))}>
              <Icon name="plus" />
              Add
            </button>
          </Transition>
        </div>
      </div>
      <div className={styles.Playlist__Inner}>
        <PlaylistItem
          title="React Admin Panel Tutorial | React Admin Dashboard Template Design"
          link="youtube.com"
          desc="React admin dashboard from scratch for beginners. React Admin Panel
          UI. Get Hostinger Discount: http://hostinger.com/lamadev Coupon Code:
          LAMADEV If it is valuable to you, you can support Lama Dev. Show more"
          active={true}
          isEditState={isEdit}
        />
        <PlaylistItem
          title="React Admin Panel Tutorial | React Admin Dashboard Template Design"
          link="youtube.com"
          isEditState={isEdit}
        />
        <PlaylistItem
          title="React Admin Panel Tutorial | React Admin Dashboard Template Design"
          link="youtube.com"
          isEditState={isEdit}
        />
      </div>
    </div>
  );
}
