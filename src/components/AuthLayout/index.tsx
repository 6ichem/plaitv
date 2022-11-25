import React from "react";
import Icon from "../Icon";
import styles from "./AuthLayout.module.scss";
export default function AuthLayout({ children, withHeader = true }: any) {
  return (
    <div className={styles.AuthLayout}>
      {withHeader && <Icon name="logo" />}
      {children}
    </div>
  );
}
