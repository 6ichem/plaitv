import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className={styles.Navbar}>
      <Icon name="navbar-logo" />

      <div>
        <Button
          title="Login"
          color="secondary"
          onClick={() => navigate("/login")}
          rounded
          className="!min-h-[50px] min-w-[109.15px]"
        />
        <Button
          title="Sign Up"
          color="primary"
          onClick={() => navigate("/register")}
          rounded
          className="!min-h-[50px] min-w-[109.15px]"
        />
      </div>
    </div>
  );
}
