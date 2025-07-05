"use client";
import { useAppForm } from "@/components/form/hook/useAppForm";
import { defaultLoginValues, LoginSchema } from "@/types/login";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export const Login = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useAppForm({
    defaultValues: defaultLoginValues,
    validators: { onChange: LoginSchema },
    onSubmit: async ({ value: { email, password } }) => {
      if (!isLoaded) return;
      setAuthError(null);

      try {
        const res = await signIn.create({ identifier: email, password });
        if (res.status === "complete") {
          await setActive({ session: res.createdSessionId });
          form.reset();
          router.push("/account");
        } else {
          // TODO: handle MFA flows when you enable them
        }
      } catch (err: any) {
        setAuthError(err.errors?.[0]?.longMessage ?? "Unknown error");
      }
    },
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <CardContent className="">
          <div className="flex w-full flex-col gap-6">
            <form.AppField name="email">
              {(field) => (
                <field.TextField label="Email" placeholder="name@example.com" />
              )}
            </form.AppField>

            <form.AppField name="password">
              {(field) => (
                <field.PasswordField label="Password" placeholder="••••••••" />
              )}
            </form.AppField>
          </div>
          <div className="pt-6">
            <form.AppForm>
              <form.SubmitButton>Login</form.SubmitButton>
            </form.AppForm>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};
