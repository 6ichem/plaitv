import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import Card from "../../../../components/Card";

export default function ExpiredLink() {
  const navigate = useNavigate();

  function goLogin() {
    navigate("/login");
  }

  return (
    <Card
      title="Your link has expired. "
      description={
        <span>
          Enter your credientials on the login page to resend the verification
          link.
        </span>
      }
      headerSpacing
    >
      <Button title="login" color="primary" onClick={goLogin} />
    </Card>
  );
}
