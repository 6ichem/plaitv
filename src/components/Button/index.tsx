import React, { ButtonHTMLAttributes } from "react";
import Loader from "../Loader";
import styles from "./Button.module.scss";

interface propTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  color: "primary";
  loading?: boolean;
}

export default function Button({
  title,
  color,
  className,
  loading = false,
  ...rest
}: propTypes) {
  return (
    <button
      className={`${styles[color]} ${(loading && "opacity-80") || ""} ${
        className || ""
      }`}
      {...rest}
      disabled={loading}
    >
      {loading ? <Loader /> : title}
    </button>
  );
}
