import styles from "./Menu.module.scss";
import MenuButton from "../../../../assets/menu.svg";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { setNewPlaylistModal, setProfileModal } from "../../actions";
import { userLogout } from "../../../Auth/Login/actions";
import Icon from "../../../../components/Icon";

export default function MenuDropdown({ mobileView = false }) {
  const dispatch = useDispatch();

  const MenuItems = [
    {
      label: "New Playlist",
      click: () => dispatch(setNewPlaylistModal(true)),
    },
    {
      label: "Profile",
      click: () => dispatch(setProfileModal(true)),
    },
    {
      label: "Log out",
      click: () => dispatch(userLogout()),
    },
  ];

  return (
    <div className={styles.Menu}>
      <Menu as="div" className={styles.Menu__Header}>
        <div className="flex items-center gap-3">
          <Menu.Button className={styles.Menu__Button}>
            <Icon name="burger" />
          </Menu.Button>

          <a
            href="/explore"
            className="text-white text-opacity-60 text-xs font-normal"
          >
            Explore
          </a>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`${styles.Menu__Items} ${
              (mobileView && "bottom-12") || ""
            }`}
          >
            {MenuItems.map((i: any, idx) => (
              <Menu.Item key={idx}>
                <button onClick={i.click}>{i.label}</button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
