import styles from "./SearchInput.module.scss";
import SearchSVG from "../../../../assets/search.svg";
import Icon from "../../../../components/Icon";
import { Fragment, useEffect, useState } from "react";
import { CheckmarkIcon } from "react-hot-toast";
import { Combobox, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPlaylist } from "../../actions";

export default function SearchInput() {
  const dispatch = useDispatch();

  const userPlaylists = useSelector(
    (state: any) => state.userPlaylists.userPlaylists
  );

  const currentPlaylist = useSelector(
    (state: any) => state.userPlaylists.currentPlaylist
  );

  useEffect(() => {
    dispatch(setCurrentPlaylist(userPlaylists && userPlaylists[0]));
    if (userPlaylists && userPlaylists.length > 0) setLoading(false);
  }, [userPlaylists]);

  const [isLoading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selecred, setSelected] = useState({});

  useEffect(() => {
    dispatch(setCurrentPlaylist(selecred));
  }, [selecred]);

  const filteredPlaylists =
    query === ""
      ? userPlaylists
      : userPlaylists.filter((playlist: any) =>
          playlist.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className={styles.SearchInput}>
      <div className="relative w-full">
        <Combobox
          value={currentPlaylist}
          onChange={setSelected}
          disabled={isLoading}
        >
          <div className="relative">
            <div className="relative w-full cursor-default overflow-hidden focus:outline-none">
              <div className={styles.SearchInput__Inner}>
                <Combobox.Input
                  onFocus={() => setOpen(true)}
                  onBlur={() => setOpen(false)}
                  placeholder={
                    isLoading ? "Loading Playlists..." : "Find playlist"
                  }
                  displayValue={(playlist: any) => playlist?.title}
                  onChange={(event) => setQuery(event.target.value)}
                  className={`${
                    (isLoading && "cursor-progress opacity-50") || ""
                  }`}
                />
              </div>

              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Icon name="search" />
              </Combobox.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter="transition duration-300 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-300 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className={styles.SearchInput__Items}>
                {filteredPlaylists &&
                filteredPlaylists.length === 0 &&
                query !== "" ? (
                  <div className={styles.SearchInput__Box}>Nothing found.</div>
                ) : (
                  filteredPlaylists &&
                  filteredPlaylists.map((playlist: any) => (
                    <Combobox.Option
                      key={playlist.playlist_id}
                      className={styles.SearchInput__Option}
                      value={playlist}
                    >
                      <span>{playlist.title}</span>
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
}
