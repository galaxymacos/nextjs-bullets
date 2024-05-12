import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

import React from "react";

// A div that shows an green message div when passing a message prop
export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) {
    return null;
  }
  return (
    <div
      className={
        "bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500"
      }
    >
      <CheckCircledIcon className={"size-4"} />
      <p>{message}</p>
    </div>
  );
};
