import Button from "../../../../components/Button";
import Card from "../../../../components/Card";

export default function InvalidLink() {
  return (
    <Card
      title="Invalid confirmation link."
      description={
        <span>
          You must use the link in the email we’ve sent you. Try again or
          contact us.
        </span>
      }
    />
  );
}
