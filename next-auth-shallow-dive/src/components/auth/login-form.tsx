"use client";
import React, { useState, useTransition } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { login } from "@/actions/login";

// This component is used as the login modal in multiple pages
export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(async () => {
      login(values).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel={"Welcome back"}
      backButtonLabel={"Don't have an account?"}
      backButtonHref={"/auth/register"}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
          {/*all inputs here*/}
          <div className={"space-y-4"}>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={"xunruan@icloud.com"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={"email"}
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={"******"}
                      disabled={isPending}
                      type={"password"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={"password"}
              control={form.control}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className={"w-full"} disabled={isPending} type={"submit"}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
