import React from "react";
import styles from "./Card.module.scss";

interface propTypes {
  title?: string;
  description?: any;
  children?: any;
  headerSpacing?: boolean;
  withHeader?: boolean;
}

export default function Card({
  children,
  title,
  description,
  headerSpacing = false,
  withHeader = true,
}: propTypes) {
  return (
    <div className={styles.AuthCard}>
      {withHeader && (
        <div className={`${styles.header} ${headerSpacing && "mb-8"}`}>
          <h1>{title}</h1>
          {description}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
