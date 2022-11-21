import Logo from "../../../assets/logo-main.svg";
import AuthLayout from "../../../components/AuthLayout";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { useDispatch } from "react-redux";

export default function ResetPassword() {
  const [isLoading, setLoading] = useState<boolean>(false);

  const [params] = useSearchParams();
  const dispatch = useDispatch();

  const password_reset_token = params.get("token");

  return (
    <AuthLayout>
      <img src={Logo} alt="" />

      <Loader type="spinner" />
    </AuthLayout>
  );
}
