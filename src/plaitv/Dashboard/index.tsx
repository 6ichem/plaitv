import { useEffect } from "react";
import styles from "./Dashboard.module.scss";

import Navigation from "./components/Navigation";
import Playlist from "./components/Playlist";
import CreatePlaylist from "./components/Overlays/CreatePlaylist";
import AddVideo from "./components/Overlays/AddVideo";

export default function Dashboard() {
  useEffect(() => {
    document.body.style.backgroundColor = "#18181A";
  }, []);

  return (
    <div className={styles.Dashboard}>
      <Navigation />

      <div className="w-full md:w-[80%] px-6"></div>

      <div className="block md:hidden">
        <Playlist />
      </div>

      <CreatePlaylist />
      <AddVideo />
    </div>
  );
}
