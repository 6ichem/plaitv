import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Logo from "../../../assets/logo-main.svg";
import Card from "../../../components/Card";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import AuthLayout from "../../../components/AuthLayout";
import { postLogin, setLoginCreds } from "./actions";
import { CREDS } from "../Register/constants";
import toast from "react-hot-toast";

export default function Login() {
  const [isLoading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const creds = useSelector(
    (state: any) => state.auth.loginState.loginCredentials
  );

  const loginData = useSelector(
    (state: any) => state.auth.loginState.loginData
  );

  const updateCreds = (cred: string, e: any) => {
    const credsToUpdate = {
      ...creds,
      [cred]: e.target.value,
    };

    dispatch(setLoginCreds(credsToUpdate));
  };

  const submitLogin = (e: any) => {
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
      localStorage.setItem("user", user);

      setLoading(false);
    } else if (loginData?.detail) {
      toast.error(loginData.detail, {
        style: { background: "#333", color: "#fff" },
      });

      setLoading(false);
    }
  }, [loginData]);

  return (
    <AuthLayout>
      <img src={Logo} alt="" />
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
