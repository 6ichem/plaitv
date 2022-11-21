import Card from "../../../../components/Card";

export default function ResetSent() {
  return (
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
}
