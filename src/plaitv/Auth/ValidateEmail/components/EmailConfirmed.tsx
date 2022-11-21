import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import Card from "../../../../components/Card";

export default function EmailConfirmed() {
  const navigate = useNavigate();

  function goLogin() {
    navigate("/login");
  }

  return (
    <Card
      title="Email confirmed succesfully."
      description={<span>You can now login with your credentials.</span>}
      headerSpacing
    >
      <Button title="login" color="primary" onClick={goLogin} />
    </Card>
  );
}
