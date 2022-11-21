import Logo from "../../../assets/logo-main.svg";
import AuthLayout from "../../../components/AuthLayout";
import { useEffect, useState } from "react";
import EmailConfirmed from "./components/EmailConfirmed";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { useDispatch } from "react-redux";
import { postValidate } from "./actions";
import { useSelector } from "react-redux";
import InvalidLink from "./components/InvalidLink";
import { DETAIL_ERRORS } from "./constants";
import Card from "../../../components/Card";
import ExpiredLink from "./components/ExpiredLink";

export default function ValidateEmail() {
  const [isLoading, setLoading] = useState<boolean>(false);

  const [params] = useSearchParams();
  const dispatch = useDispatch();

  const validateData = useSelector(
    (state: any) => state.auth.validateState.validateData
  );

  const email_token = params.get("token");
  const isTokenAvail = email_token && email_token?.trim().length !== 0;

  const validateToken = () => {
    setLoading(true);
    dispatch(postValidate(email_token));
  };

  useEffect(() => {
    if (isTokenAvail) {
      validateToken();
    }
  }, []);

  console.log("is email token", isTokenAvail);
  console.log(validateData);

  return (
    <AuthLayout>
      <img src={Logo} alt="" />

      <div className="mt-12">
        {!isTokenAvail && <InvalidLink />}

        {isTokenAvail && !validateData && (
          <Card withHeader={false}>
            <Loader type="spinner" />
          </Card>
        )}

        {validateData?.status_code === 200 && <EmailConfirmed />}

        {validateData?.detail === DETAIL_ERRORS.INVALID_LINK && <InvalidLink />}

        {validateData?.detail === DETAIL_ERRORS.EXPIRED && <ExpiredLink />}
      </div>
    </AuthLayout>
  );
}
