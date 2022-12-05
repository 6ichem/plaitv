import React, { ButtonHTMLAttributes } from "react";
import Loader from "../Loader";
import styles from "./Button.module.scss";

interface propTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  color: "primary" | "secondary";
  loading?: boolean;
  rounded?: boolean;
}

export default function Button({
  title,
  color,
  className,
  loading = false,
  rounded = false,
  ...rest
}: propTypes) {
  return (
    <button
      className={`${styles[color]} ${(loading && "opacity-40") || ""} ${
        className || ""
      }  ${(rounded && "!rounded-full") || ""}`}
      {...rest}
      disabled={loading}
    >
      {loading ? <Loader /> : title}
    </button>
  );
}
