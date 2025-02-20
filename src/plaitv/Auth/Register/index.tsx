import React, { SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import ConfirmEmail from "./components/ConfirmEmail";
import AuthLayout from "../../../components/AuthLayout";
import { postRegister, setRegisterCreds } from "./actions";
import toast from "react-hot-toast";
import SignUp from "./components/SignUp";

export default function Register() {
  const [isConfirmEmail, setConfirmEmail] = useState<boolean>(false);

  const dispatch = useDispatch();

  const creds = useSelector(
    (state: any) => state.auth.registerState.registerCredentials
  );
  const registerData = useSelector(
    (state: any) => state.auth.registerState.registerData
  );
  const isLoading = useSelector((state: any) => state.loaders.registerLoader);

  const updateCreds = (cred: string, e: SyntheticEvent) => {
    const credsToUpdate = {
      ...creds,
      [cred]: (e.target as HTMLInputElement).value,
    };

    dispatch(setRegisterCreds(credsToUpdate));
  };

  const submitRegister = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(postRegister(creds));
  };

  const RenderView = () =>
    isConfirmEmail ? (
      <ConfirmEmail registerData={registerData} dispatch={dispatch} />
    ) : (
      <SignUp
        submitRegister={submitRegister}
        updateCreds={updateCreds}
        isLoading={isLoading}
      />
    );

  useEffect(() => {
    if (registerData?.user_id) {
      if (!registerData.is_active) setConfirmEmail(true);
    }
  }, [registerData]);

  return <AuthLayout>{RenderView()}</AuthLayout>;
}
