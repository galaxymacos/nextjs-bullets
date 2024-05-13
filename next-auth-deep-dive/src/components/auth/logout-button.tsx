"use client";

import { ReactNode } from "react";

type LogoutButtonProps = {
  children?: ReactNode;
};

import React from "react";
import { logout } from "@/actions/logout";

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };
  return (
    <span onClick={onClick} className={"cursor-pointer"}>
      {children}
    </span>
  );
};

export default LogoutButton;
