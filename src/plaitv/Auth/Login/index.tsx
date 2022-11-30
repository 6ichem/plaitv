import React, { SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Card from "../../../components/Card";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import AuthLayout from "../../../components/AuthLayout";
import { postLogin, postRefreshToken, setLoginCreds } from "./actions";
import { CREDS } from "../Register/constants";
import toast from "react-hot-toast";
import {
  setLocalAccessToken,
  setLocalAccessTokenExpiry,
  setLocalUser,
} from "../../../http/utils";

export default function Login() {
  const dispatch = useDispatch();

  const creds = useSelector(
    (state: any) => state.auth.loginState.loginCredentials
  );
  const loginData = useSelector(
    (state: any) => state.auth.loginState.loginData
  );
  const isLoading = useSelector((state: any) => state.loaders.loginLoader);

  const updateCreds = (cred: string, e: SyntheticEvent) => {
    const credsToUpdate = {
      ...creds,
      [cred]: (e.target as HTMLInputElement).value,
    };

    dispatch(setLoginCreds(credsToUpdate));
  };

  const submitLogin = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(postLogin(creds));
  };

  return (
    <AuthLayout>
      <Card
        title="Sign in"
        description={
          <span>
            New Here? <a href="/register">Create an Account</a>
          </span>
        }
        headerSpacing
      >
        <form method="post" onSubmit={(e) => submitLogin(e)}>
          <Input
            type="email"
            placeholder="Email"
            className="mb-5"
            withLabel
            label="Email"
            onChange={(e) => updateCreds(CREDS.USERNAME, e)}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            className="mb-8"
            withLabel
            label="Password"
            onChange={(e) => updateCreds(CREDS.PASSWORD, e)}
            required
          />

          <Button title="Log in" color="primary" loading={isLoading} />
        </form>
        <a href="/forgot-password">Forgot password?</a>
      </Card>
    </AuthLayout>
  );
}
