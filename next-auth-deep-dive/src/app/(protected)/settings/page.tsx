"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
// import { auth } from "@/auth";

const SettingsPage = () => {
  const currentUser = useCurrentUser();
  // server way to get session
  // const session = await auth();

  const onClick = () => {
    // signOut(); // pure client side
    logout(); // server action way
  };
  return (
    <div className={"p-10 rounded-xl bg-white"}>
      <button onClick={onClick}>Sign out</button>
    </div>
  );
};

export default SettingsPage;
