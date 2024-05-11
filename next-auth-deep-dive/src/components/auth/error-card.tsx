import React from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel={"Oops, something went wrong"}
      backButtonHref={"/auth/login"}
      backButtonLabel={"Back to login"}
    >
      <div className={"flex justify-center"}>
        <ExclamationTriangleIcon className={"text-destructive"} />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
