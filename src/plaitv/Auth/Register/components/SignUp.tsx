import React from "react";
import Button from "../../../../components/Button";
import Card from "../../../../components/Card";
import Input from "../../../../components/Input";
import { CREDS } from "../constants";

export default function SignUp({
  submitRegister,
  updateCreds,
  isLoading,
}: any) {
  return (
    <Card
      title="Create Account"
      headerSpacing
      description={
        <span>
          Already have an account? <a href="/login">Login here</a>
        </span>
      }
    >
      <form method="post" onSubmit={(e) => submitRegister(e)}>
        <Input
          type="email"
          placeholder="name@company.com"
          className="mb-5"
          withLabel
          label="Email"
          onChange={(e) => updateCreds(CREDS.EMAIL, e)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          className="mb-5"
          withLabel
          label="Password"
          onChange={(e) => updateCreds(CREDS.PASSWORD, e)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          className="mb-8"
          withLabel
          label="Repeat password"
          onChange={(e) => updateCreds(CREDS.CONFIRM_PASSWORD, e)}
          required
        />

        <Button
          title="Log in"
          color="primary"
          type="submit"
          loading={isLoading}
        />
      </form>
      <a href="/forgot-password">Forgot password?</a>
    </Card>
  );
}
