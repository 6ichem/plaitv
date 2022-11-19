import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCredentials } from "./actions";
import styles from "./Login.module.scss";

import Logo from "../../assets/logo-main.svg";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ForgotPasswrod from "./components/ForgotPasswrod";

export default function Login() {
  const dispatch = useDispatch();

  const creds = useSelector((state: any) => state.login.credentials);

  const updateCreds = (e: any) => {
    dispatch(setCredentials({ ...creds, email: e.target.value }));
  };

  return (
    <div className={styles.Login}>
      <img src={Logo} alt="" />
      <Card
        title="Sign in"
        description={
          <span>
            New Here? <a href="/register">Create an Account</a>
          </span>
        }
      >
        <form>
          <Input
            type="text"
            placeholder="name@company.com"
            className="mb-5"
            withLabel
            label="Email"
          />

          <Input
            type="password"
            placeholder="Password"
            className="mb-8"
            withLabel
            label="Password"
          />

          <Button title="Log in" color="primary" />
        </form>
        <a href="#">Forgot password?</a>
      </Card>
    </div>
  );
}
