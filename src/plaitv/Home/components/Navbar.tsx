import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={styles.Navbar}>
      <Icon name="navbar-logo" />

      <div>
        <Button
          title="Login"
          color="secondary"
          rounded
          className="!min-h-[50px] min-w-[109.15px]"
        />
        <Button
          title="Sign Up"
          color="primary"
          rounded
          className="!min-h-[50px] min-w-[109.15px]"
        />
      </div>
    </div>
  );
}
