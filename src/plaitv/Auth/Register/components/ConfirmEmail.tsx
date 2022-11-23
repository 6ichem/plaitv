import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../../../../components/Card";
import { postResendMail } from "../actions";

export default function ConfirmEmail({ registerData, dispatch }: any) {
  const resendData = useSelector(
    (state: any) => state.auth.registerState.resendData
  );
  const submitResend = () => {
    dispatch(postResendMail(registerData));
  };

  useEffect(() => {
    console.log("resendData", resendData);
  }, [resendData]);

  return (
    <Card
      title="Confirm your email."
      description={
        <span>
          Didn't receive an email?{" "}
          <button onClick={submitResend}>
            <a>Resend email</a>
          </button>
        </span>
      }
    >
      <span className="font-normal text-sm text-[#9CA3AF] mt-2.5">
        You must verify your email befor using plai.tv.
      </span>
    </Card>
  );
}
