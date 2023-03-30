import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser, setSearchInput } from "../plaitv/Explore/actions";
import Loader from "./Loader";

export default function ExploreSearchInput() {
  const dispatch = useDispatch();
  const searchValue = useSelector((state: any) => state.explore.searchInput);
  const isLoading = useSelector((state: any) => state.explore.searchLoader);

  return (
    <div className="relative w-full lg:w-[714px]">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#464647]">
        @
      </div>
      <input
        type="search"
        className="block w-full p-3 pl-9 text-sm text-gray-400 placeholder-gray-500 bg-[#262628] rounded-[3px] outline-none"
        placeholder="username"
        onChange={(e) => dispatch(setSearchInput(e.target.value))}
        value={searchValue}
        required
      />
      <button type="submit" className="absolute right-5 bottom-2.5 top-2.5">
        {isLoading ? (
          <div className="mr-3">
            <Loader />
          </div>
        ) : (
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.4583 19.7917C16.0607 19.7917 19.7917 16.0607 19.7917 11.4583C19.7917 6.85596 16.0607 3.125 11.4583 3.125C6.85596 3.125 3.125 6.85596 3.125 11.4583C3.125 16.0607 6.85596 19.7917 11.4583 19.7917Z"
              stroke="white"
              strokeOpacity="0.5"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.875 21.875L17.3438 17.3438"
              stroke="white"
              strokeOpacity="0.5"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
