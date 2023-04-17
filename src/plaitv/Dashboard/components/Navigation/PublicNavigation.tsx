import React from "react";
import Icon from "../../../../components/Icon";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PublicNavigation() {
  const navigate = useNavigate();

  const currentPlaylist = useSelector(
    (state: any) => state.userPlaylists.currentPlaylist
  );

  const foundProfile = useSelector((state: any) => state.explore.foundProfile);

  return (
    <div className="p-6 flex items-center w-full">
      <button onClick={() => navigate("/")}>
        <Icon name="navbar-logo" className="mr-12" />
      </button>
      <button
        className="flex items-center transition-all duration-300 ease-in-out hover:opacity-75"
        onClick={() => navigate(`/profile/${foundProfile.username}`)}
      >
        <Icon name="arrow-left" className="mr-2" />
        <span className="text-white text-opacity-40 block">
          @{foundProfile.username}
        </span>
        <span className="text-white font-bold mx-2">|</span>

        <span className="text-white font-bold">{currentPlaylist?.title}</span>
      </button>
    </div>
  );
}
