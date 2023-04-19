import { useEffect } from "react";
import Card from "../../../../components/Card";

export default function ResetSent() {
  useEffect(() => {
    setTimeout(() => {
      location.href = "/";
    }, 1500);
  }, []);

  return (
    <Card
      title="Password reset email sent, you will be redirected..."
      description={
        <span>
          If the email address you entered is registered, you will recieve an
          email to reset your password.
        </span>
      }
    />
  );
}
