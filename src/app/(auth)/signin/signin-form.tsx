"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useActionState } from "react";
import { signIn } from "./action";

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signIn, {});
  return (
    <form className="grid gap-4" action={formAction}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" placeholder="m@example.com" required />
        {state?.errors?.email && (
          <span className="text-red-400">{state?.errors?.email}</span>
        )}
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
        </div>
        <Input id="password" name="password" type="password" required />
        {state?.errors?.password && (
          <span className="text-red-400">{state?.errors?.password}</span>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        Login
      </Button>
      <Button variant="outline" className="flex w-full items-center gap-2">
        Login with GitHub
        <GitHubLogoIcon className="size-5" />
      </Button>
    </form>
  );
}
