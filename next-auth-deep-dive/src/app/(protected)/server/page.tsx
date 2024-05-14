import React from "react";
import { currentUser } from "@/lib/auth";
import { UserInfo } from "@/components/user-info";

const ServerPage = async () => {
  const user = await currentUser();
  if (!user) return null;
  return <UserInfo label={"Server Component 💻"} user={user} />;
};

export default ServerPage;
