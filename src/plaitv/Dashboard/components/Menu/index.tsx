import styles from "./Menu.module.scss";
import MenuButton from "../../../../assets/menu.svg";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { setNewPlaylistModal } from "../../actions";

export default function MenuDropdown() {
  const dispatch = useDispatch();

  const MenuItems = [
    {
      label: "New Playlist",
      click: () => dispatch(setNewPlaylistModal(true)),
    },
    {
      label: "Profile",
      click: () => {
        console.log("profile");
      },
    },
    {
      label: "Log out",
      click: () => {
        console.log("log out");
      },
    },
  ];

  return (
    <div className={styles.Menu}>
      <Menu as="div" className={styles.Menu__Header}>
        <div>
          <Menu.Button className={styles.Menu__Button}>
            <img src={MenuButton} alt="" />
          </Menu.Button>
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
          <Menu.Items className={styles.Menu__Items}>
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
