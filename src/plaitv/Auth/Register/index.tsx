import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Logo from "../../../assets/logo-main.svg";
import Card from "../../../components/Card";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import ConfirmEmail from "./components/ConfirmEmail";
import AuthLayout from "../../../components/AuthLayout";
import { postRegister, setRegisterCreds } from "./actions";
import { CREDS } from "./constants";
import toast from "react-hot-toast";
import SignUp from "./components/SignUp";

export default function Register() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isConfirmEmail, setConfirmEmail] = useState<boolean>(false);

  const dispatch = useDispatch();

  const creds = useSelector(
    (state: any) => state.auth.registerState.registerCredentials
  );
  const registerData = useSelector(
    (state: any) => state.auth.registerState.registerData
  );

  const updateCreds = (cred: string, e: any) => {
    const credsToUpdate = {
      ...creds,
      [cred]: e.target.value,
    };

    dispatch(setRegisterCreds(credsToUpdate));
  };

  const submitRegister = (e: any) => {
    setLoading(true);

    e.preventDefault();

    dispatch(postRegister(creds));
  };

  const RenderView = () =>
    isConfirmEmail ? (
      <ConfirmEmail />
    ) : (
      <SignUp
        submitRegister={submitRegister}
        updateCreds={updateCreds}
        isLoading={isLoading}
      />
    );

  useEffect(() => {
    if (registerData?.user_id) {
      toast.success("Signed up successfully!", {
        style: { background: "#333", color: "#fff" },
      });

      if (!registerData.is_active) setConfirmEmail(true);

      setLoading(false);
    } else if (registerData?.detail) {
      toast.error(registerData.detail, {
        style: { background: "#333", color: "#fff" },
      });

      setLoading(false);
    }
  }, [registerData]);

  return (
    <AuthLayout>
      <img src={Logo} alt="" />
      {RenderView()}
    </AuthLayout>
  );
}
