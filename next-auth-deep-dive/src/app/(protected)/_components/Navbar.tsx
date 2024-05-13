"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import UserButton from "@/components/auth/user-button";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav
      className={
        "bg-secondary flex justify-between items-center w-[600px] p-4 rounded-xl shadow-sm"
      }
    >
      {/*options*/}
      <div className={"flex gap-x-2"}>
        <Button
          asChild={true}
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href={"/settings"}>Server</Link>
        </Button>
        <Button
          asChild={true}
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href={"/client"}>Client</Link>
        </Button>

        <Button
          asChild={true}
          variant={pathname === "/admin" ? "default" : "outline"}
        >
          <Link href={"/admin"}>admin</Link>
        </Button>
        <Button
          asChild={true}
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href={"/settings"}>Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};

export default Navbar;
