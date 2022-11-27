import React, { SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Card from "../../../components/Card";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import AuthLayout from "../../../components/AuthLayout";
import { postLogin, setLoginCreds } from "./actions";
import { CREDS } from "../Register/constants";
import toast from "react-hot-toast";
import Icon from "../../../components/Icon";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLoading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const creds = useSelector(
    (state: any) => state.auth.loginState.loginCredentials
  );

  const loginData = useSelector(
    (state: any) => state.auth.loginState.loginData
  );

  const updateCreds = (cred: string, e: SyntheticEvent) => {
    const credsToUpdate = {
      ...creds,
      [cred]: (e.target as HTMLInputElement).value,
    };

    dispatch(setLoginCreds(credsToUpdate));
  };

  const submitLogin = (e: SyntheticEvent) => {
    setLoading(true);

    e.preventDefault();

    dispatch(postLogin(creds));
  };

  useEffect(() => {
    if (loginData?.access_token) {
      toast.success("Logged in successfully!", {
        style: { background: "#333", color: "#fff" },
      });

      const { access_token, user } = loginData;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      setLoading(false);

      window?.location.replace("/home");
    } else if (loginData?.detail) {
      toast.error(loginData.detail, {
        style: { background: "#333", color: "#fff" },
      });

      setLoading(false);
    }
  }, [loginData]);

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
