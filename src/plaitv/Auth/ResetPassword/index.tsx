import AuthLayout from "../../../components/AuthLayout";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { useDispatch } from "react-redux";
import Card from "../../../components/Card";
import { postCheckToken } from "./actions";
import { useSelector } from "react-redux";
import { DETAIL_ERRORS } from "../ValidateEmail/constants";
import InvalidLink from "./components/InvalidLink";
import ExpiredLink from "../ValidateEmail/components/ExpiredLink";
import ResetForm from "./components/ResetForm";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const dispatch = useDispatch();

  const password_reset_token = params.get("token");
  const isTokenAvail =
    password_reset_token && password_reset_token?.trim().length !== 0;

  const checkTokenData = useSelector(
    (state: any) => state.auth.resetState.checkTokenData
  );

  const checkToken = () => {
    dispatch(postCheckToken(password_reset_token));
  };

  useEffect(() => {
    if (isTokenAvail) checkToken();
  }, []);

  return (
    <AuthLayout>
      <div className="mt-12">
        {!isTokenAvail && <InvalidLink />}

        {isTokenAvail && !checkTokenData && (
          <Card withHeader={false}>
            <Loader type="spinner" />
          </Card>
        )}

        {checkTokenData?.status_code === 200 && (
          <ResetForm
            password_reset_token={password_reset_token}
            dispatch={dispatch}
          />
        )}

        {checkTokenData?.detail === DETAIL_ERRORS.INVALID_LINK && (
          <InvalidLink />
        )}

        {checkTokenData?.detail === DETAIL_ERRORS.EXPIRED && <ExpiredLink />}
      </div>
    </AuthLayout>
  );
}
