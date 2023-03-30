import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ExploreSearchInput from "../../../components/ExploreSearchInput";
import Icon from "../../../components/Icon";
import Loader from "../../../components/Loader";
import { getLocalAccessToken } from "../../../http/utils";
import { findProfile, findUserPlaylists } from "../actions";

export default function Profile() {
  const dispatch = useDispatch();
  const isAuthenticated = getLocalAccessToken();
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
        {foundPlaylists &&
          foundPlaylists.map((i: any, idx: number) => (
            <div
              className="text-white bg-[#0E0E0E] p-5 w-full lg:max-w-[300px] rounded-[5px] mt-3 lg:mt-0"
              key={idx}
            >
              <img
                src={i.image}
                className="w-full lg:w-[261.82px] h-auto lg:h-[181.36px] rounded"
                alt=""
              />
              <div className="mt-4">
                <h1>{i.title}</h1>
                <span className="text-white text-opacity-60 text-xs">
                  {i.description}
                </span>
              </div>
            </div>
          ))}
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
