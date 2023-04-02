import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ExploreSearchInput from "../../../components/ExploreSearchInput";
import Icon from "../../../components/Icon";
import Loader from "../../../components/Loader";
import { getLocalAccessToken } from "../../../http/utils";
import { findProfile, findUserPlaylists } from "../actions";
import { getPlaylistMedia, setCurrentPlaylist } from "../../Dashboard/actions";

export default function Profile() {
  const dispatch = useDispatch();
  const isAuthenticated = getLocalAccessToken();
  const navigate = useNavigate();

  const { username } = useParams();

  const [isLoading, setLoading] = useState(false);

  const foundProfile = useSelector((state: any) => state.explore.foundProfile);
  const foundPlaylists = useSelector(
    (state: any) => state.explore.foundProfilePlaylists
  );

  useEffect(() => {
    setLoading(true);

    dispatch(findProfile(username));
  }, []);

  useEffect(() => {
    dispatch(findUserPlaylists());
  }, [foundProfile]);

  useEffect(() => {
    if (foundPlaylists) {
      setLoading(false);
    }
  }, [foundPlaylists]);

  useEffect(() => {
    document.body.style.backgroundColor = "#000000";
  }, []);

  const viewPlaylist = (playlist: any) => {
    dispatch(setCurrentPlaylist(playlist));
    dispatch(getPlaylistMedia({ playlist_id: playlist?.playlist_id }));

    navigate("/playlist");
  };

  const Playlists = () => (
    <div className="flex flex-col lg:flex-row justify-between mt-10 lg:mt-24">
      <div className="flex flex-col w-1/3">
        <span className="text-white text-opacity-30 font-bold text-lg uppercase">
          Channel
        </span>
        <h1 className="text-white font-bold text-2xl">
          @{foundProfile?.username}
        </h1>
        {foundProfile?.profile_description && (
          <span className="mt-5 text-white text-opacity-60 text-sm font-normal">
            {foundProfile?.profile_description}
          </span>
        )}
      </div>
      <div className="w-full flex flex-wrap gap-5">
        {foundPlaylists && foundPlaylists.length > 0 ? (
          foundPlaylists.map((i: any, idx: number) => (
            <button
              className="text-white bg-[#0E0E0E] p-5 w-full lg:max-w-[300px] rounded-[5px] mt-3 lg:mt-0 text-left transition-all duration-500 ease-in-out hover:opacity-75 outline-none"
              key={idx}
              onClick={() => viewPlaylist(i)}
            >
              <img
                src={i.image}
                className="w-full lg:w-[261.82px] h-52 object-cover object-center	lg:h-[181.36px] rounded"
                alt=""
              />
              <div className="mt-4">
                <h1>{i.title}</h1>
                <span className="text-white text-opacity-60 text-xs">
                  {i.description}
                </span>
              </div>
            </button>
          ))
        ) : (
          <span className="text-white text-sm font-normal text-center mt-24 flex justify-center mx-auto">
            This user doesn’t have any plublic playlists yet :(
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="px-5 lg:px-10 py-6 items-center">
      <div className="flex flex-col lg:flex-row ">
        <div className="flex items-center">
          <Icon name="navbar-logo" />
          {isAuthenticated && (
            <Link
              to="/profile"
              className="text-white opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out ml-10"
            >
              My profile
            </Link>
          )}
        </div>
        <div className="flex justify-center w-full mt-3 lg:mt-0">
          <ExploreSearchInput />
        </div>
      </div>

      {isLoading ? (
        <div className="mt-10 lg:mt-24">
          <Loader type="spinner" />
        </div>
      ) : (
        <Playlists />
      )}
    </div>
  );
}
