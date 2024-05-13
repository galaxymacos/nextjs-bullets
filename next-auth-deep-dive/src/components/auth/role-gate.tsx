"use client";

import { ReactNode } from "react";

type RoleGateProps = {
  children: ReactNode;
  allowedRoles: UserRole;
};

import React from "react";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "@/components/form-error";

export const RoleGate = ({ allowedRoles, children }: RoleGateProps) => {
  const role = useCurrentRole();
  if (role !== allowedRoles) {
    return (
      <FormError message={"You do not have permission to view this content!"} />
    );
  }

  return <>{children}</>;
};
