import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCredentials } from "./actions";

export default function Login() {
  const dispatch = useDispatch();

  const creds = useSelector((state: any) => state.login.credentials);

  const updateCreds = (e: any) => {
    dispatch(setCredentials({ ...creds, email: e.target.value }));
  };

  return (
    <div>
      Login
      <input type="text" onChange={(e) => updateCreds(e)} name="" id="" />
    </div>
  );
}
