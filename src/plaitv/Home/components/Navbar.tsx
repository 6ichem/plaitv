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
      <button onClick={() => navigate("/")} className="hidden lg:block">
        <Icon name="navbar-logo" className="mr-12" />
      </button>
      <div className="flex place-content-end w-full">
        <div className="items-center flex gap-5">
          <a
            href="/explore"
            className="text-white text-opacity-60 text-xs font-normal"
          >
            Explore
          </a>

          <Button
            title="Login"
            color="secondary"
            onClick={() => navigate("/login")}
            rounded
            className="px-3 py-1 !w-auto"
          />
          <Button
            title="Sign Up"
            color="primary"
            onClick={() => navigate("/register")}
            rounded
            className="px-3 py-1 !w-auto"
          />
        </div>
      </div>
    </div>
  );
}
