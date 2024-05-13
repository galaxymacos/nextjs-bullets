"use client";
import React from "react";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = async () => {
  const user = useCurrentUser();
  if (!user) return null;
  return <UserInfo label={"📱 Client Component"} user={user} />;
};

export default ClientPage;
