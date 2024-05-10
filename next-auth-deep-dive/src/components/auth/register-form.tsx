"use client";
import React, { useState, useTransition } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/register";

// This component is used as the login modal in multiple pages
export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(async () => {
      register(values).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel={"Create an account"}
      backButtonLabel={"Already have an account?"}
      backButtonHref={"/auth/login"}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
          {/*all inputs here*/}
          <div className={"space-y-4"}>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={"John Wack"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={"name"}
              control={form.control}
            />
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
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
