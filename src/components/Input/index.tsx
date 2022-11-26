import React, { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface propTypes extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  withLabel?: boolean;
  label?: string;
  wrapperStyle?: string;
}

export default function Input({
  type,
  withLabel = true,
  label,
  wrapperStyle,
  ...rest
}: propTypes) {
  return (
    <div className={`${styles.Input} ${(wrapperStyle && wrapperStyle) || ""}`}>
      {withLabel && <label htmlFor={label}>{label}</label>}
      <input type={type} name={label} {...rest} />
    </div>
  );
}
