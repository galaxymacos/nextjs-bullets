"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogoutButton from "@/components/auth/logout-button";
import { ExitIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const UserButton = () => {
  const user = useCurrentUser();
  console.log(user?.image);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <Image
            src={user?.image || ""}
            alt={""}
            width={40}
            height={40}
            sizes={"40px"}
          />
          <AvatarFallback className={"bg-sky-500"}>
            <FaUser className={"text-white"} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-40"} align={"end"}>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className={"size-4 mr-2"} />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
