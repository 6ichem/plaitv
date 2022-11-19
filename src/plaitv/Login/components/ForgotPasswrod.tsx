import React from "react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Input from "../../../components/Input";

export default function ForgotPasswrod() {
  const ResetSent = () => (
    <Card
      title="Password reset email sent."
      description={
        <span>
          If the email address you entered is registered, you will recieve an
          email to reset your password.
        </span>
      }
    />
  );
  return (
    <Card title="Forgot password.">
      <form>
        <Input
          type="text"
          placeholder="name@company.com"
          className="mb-5"
          withLabel
          label="Email"
        />

        <Button title="Reset" color="primary" />
      </form>
    </Card>
  );
}
