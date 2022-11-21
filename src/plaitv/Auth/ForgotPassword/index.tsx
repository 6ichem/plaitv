import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Input from "../../../components/Input";
import Logo from "../../../assets/logo-main.svg";
import AuthLayout from "../../../components/AuthLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { postForgot, setForgotCreds } from "./actions";
import ResetSent from "./components/ResetSent";

export default function ForgotPasswrod() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isResetSent, setResetSent] = useState<boolean>(false);

  const dispatch = useDispatch();

  const forgotData = useSelector(
    (state: any) => state.auth.forgotState.forgotData
  );

  const submitForgot = (e: any) => {
    setLoading(true);
    e.preventDefault();

    dispatch(postForgot());
  };

  useEffect(() => {
    const { status_code, detail } = forgotData ?? {};
    if (status_code && detail) {
      if (status_code === 200) setResetSent(true);
      setLoading(false);
    }
  }, [forgotData]);

  const RenderView = () =>
    isResetSent ? (
      <ResetSent />
    ) : (
      <Card title="Forgot password.">
        <form method="post" onSubmit={(e) => submitForgot(e)}>
          <Input
            type="text"
            placeholder="name@company.com"
            className="mb-8"
            withLabel
            label="Email"
            onChange={(e) => dispatch(setForgotCreds(e.target.value))}
          />

          <Button title="Reset" color="primary" loading={isLoading} />
        </form>
      </Card>
    );

  return (
    <AuthLayout>
      <img src={Logo} alt="" />

      {RenderView()}
    </AuthLayout>
  );
}
