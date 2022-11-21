import React from "react";
import styles from "./AuthLayout.module.scss";
export default function AuthLayout({ children }: any) {
  return <div className={styles.AuthLayout}>{children}</div>;
}
