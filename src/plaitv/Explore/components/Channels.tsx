import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser, setSearchResults } from "../actions";

export default function Channels() {
  const dispatch = useDispatch();

  const searchValue = useSelector((state: any) => state.explore.searchInput);
  const searchResults = useSelector(
    (state: any) => state.explore.searchResults
  );

  const Results = () =>
    searchResults.map((i: any, idx: number) => (
      <Link
        key={idx}
        to={`/profile/${i.username}`}
        className="text-white font-normal text-xl pb-7 pt-5 hover:opacity-60 transition-all duration-300 ease-in-out"
      >
        {i.username}
      </Link>
    ));

  const submitSearch = () => {
    dispatch(searchUser(searchValue));
  };

  useEffect(() => {
    if (searchValue.trim().length > 0) {
      submitSearch();
    } else {
      dispatch(setSearchResults([]));
    }
  }, [searchValue]);

  return (
    <div>
      <h1 className="uppercase text-white text-opacity-30 font-bold text-xs">
        Channels
      </h1>
      {!searchResults && (
        <span className="text-white opacity-60 text-center block mt-5">
          Search for a username to find results...
        </span>
      )}
      {searchResults && (
        <div className="flex flex-col divide-y divide-white divide-opacity-20 mt-5">
          {searchResults.length > 0 ? <Results /> : <span>No users found</span>}
        </div>
      )}
    </div>
  );
}
