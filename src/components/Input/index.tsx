import React, { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface propTypes extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  withLabel: boolean;
  label: string;
}

export default function Input({ type, withLabel, label, ...rest }: propTypes) {
  return (
    <div className={styles.Input}>
      {withLabel && <label htmlFor={label}>{label}</label>}
      <input type={type} name={label} {...rest} />
    </div>
  );
}
