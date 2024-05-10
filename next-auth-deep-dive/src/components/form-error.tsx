import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

import React from "react";

// A div that shows an error message when passing a message prop
const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }
  return (
    <div
      className={
        "bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive"
      }
    >
      <ExclamationTriangleIcon className={"size-4"} />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
