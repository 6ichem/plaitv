import React from "react";
import Card from "../../../../components/Card";

export default function ConfirmEmail() {
  return (
    <Card
      title="Confirm your email."
      description={
        <span>
          Didn't receive an email? <a href="/login">Resend email</a>
        </span>
      }
    >
      <span className="font-normal text-sm text-[#9CA3AF] mt-2.5">
        You must verify your email befor using plai.tv.
      </span>
    </Card>
  );
}
