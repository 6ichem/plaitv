import { useEffect } from "react";
import styles from "./Dashboard.module.scss";

import Navigation from "./components/Navigation";
import Playlist from "./components/Playlist";

export default function Dashboard() {
  useEffect(() => {
    document.body.style.backgroundColor = "#18181A";
  }, []);

  return (
    <div className={styles.Dashboard}>
      <Navigation />

      <div className="block md:hidden">
        <Playlist />
      </div>
    </div>
  );
}
