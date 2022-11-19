import React from "react";
import styles from "./Card.module.scss";

interface propTypes {
  title?: string;
  description?: any;
  children?: any;
}

export default function Card({ children, title, description }: propTypes) {
  return (
    <div className={styles.AuthCard}>
      <div className={styles.header}>
        <h1>{title}</h1>
        {description}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
