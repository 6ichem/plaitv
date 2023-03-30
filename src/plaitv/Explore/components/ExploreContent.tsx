import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ExploreSearchInput from "../../../components/ExploreSearchInput";
import { useNavigate } from "react-router-dom";

export default function ExploreContent() {
  return (
    <div className="text-white">
      <h1 className="uppercase text-white font-medium leading-6">Explore</h1>
      <div className="mt-6">
        <ExploreSearchInput />
      </div>
    </div>
  );
}
