import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCredentials } from "./actions";
import styles from "./Register.module.scss";

import Logo from "../../assets/logo-main.svg";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ConfirmEmail from "./components/ConfirmEmail";

export default function Register() {
  const dispatch = useDispatch();

  const creds = useSelector((state: any) => state.login.credentials);

  const updateCreds = (e: any) => {
    dispatch(setCredentials({ ...creds, email: e.target.value }));
  };

  return (
    <div className={styles.Register}>
      <img src={Logo} alt="" />
      <Card
        title="Sign in"
        description={
          <span>
            Already have an account? <a href="/login">Login here</a>
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
            className="mb-5"
            withLabel
            label="Password"
          />

          <Input
            type="password"
            placeholder="Password"
            className="mb-8"
            withLabel
            label="Repeat password"
          />

          <Button title="Log in" color="primary" />
        </form>
        <a href="#">Forgot password?</a>
      </Card>
    </div>
  );
}
