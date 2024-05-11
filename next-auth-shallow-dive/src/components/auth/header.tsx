import React from "react";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className={"w-full flex flex-col gap-y-4 items-center justify-center"}>
      <h1 className={cn(font.className, "text-3xl font-semibold")}>
        {/*NOTE: drop-shadow puts shadow on the letter, while shadow puts shadow on the box bottom */}
        🔐Auth
      </h1>
      <p className={"text-muted-foreground text-sm"}>{label}</p>
    </div>
  );
};

export default Header;
