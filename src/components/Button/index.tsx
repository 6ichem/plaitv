import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface propTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  color: "primary";
}

export default function Button({ title, color, ...rest }: propTypes) {
  return (
    <button className={styles[color]} {...rest}>
      {title}
    </button>
  );
}
