import React, { SyntheticEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Button from "../../../../components/Button";
import Card from "../../../../components/Card";
import Input from "../../../../components/Input";
import { postReset } from "../actions";

export default function ResetForm({ password_reset_token, dispatch }: any) {
  const [password, setPassword] = useState<string>("");
  const [repeatPass, setRepeatPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const resetPasswordData = useSelector(
    (state: any) => state.auth.resetState.resetPasswordData
  );

  const submitReset = (e: SyntheticEvent) => {
    e.preventDefault();

    if (repeatPass !== password) {
      toast.error("Password and repeat password don't match!", {
        style: { background: "#333", color: "#fff", minWidth: "38%" },
      });
    } else {
      setLoading(true);
      dispatch(
        postReset({
          password_reset_token,
          new_password: password,
        })
      );
    }
  };

  useEffect(() => {
    if (resetPasswordData?.status_code === 200) {
      toast.success("Password reset successfully!", {
        style: { background: "#333", color: "#fff" },
      });

      setTimeout(() => {
        location.href = "/login";
      }, 1500);

      setLoading(false);
    } else if (resetPasswordData?.detail) {
      toast.error(resetPasswordData.detail, {
        style: { background: "#333", color: "#fff" },
      });

      setLoading(false);
    }
  }, [resetPasswordData]);

  return (
    <Card title="Reset password">
      <form method="post" onSubmit={(e) => submitReset(e)}>
        <Input
          type="password"
          placeholder="New password"
          className="mb-5"
          withLabel
          label="New password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Repeat password"
          className="mb-8"
          withLabel
          label="Repeat password"
          onChange={(e) => setRepeatPass(e.target.value)}
          required
        />

        <Button title="Reset" color="primary" loading={loading} />
      </form>
    </Card>
  );
}
