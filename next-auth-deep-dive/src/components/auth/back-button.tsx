"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button className={"w-full"} size={"sm"} variant={"link"} asChild={true}>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
