"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useActionState } from "react";
import { signUp } from "./action";

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUp, {});

  return (
    <form className="grid gap-4" action={formAction}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="m@example.com"
          required
          name="email"
          value={state.data?.email}
        />
        {state?.errors?.email && (
          <span className="text-red-400">{state?.errors?.email}</span>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
        {state?.errors?.password && (
          <span className="text-red-400">{state?.errors?.password}</span>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        Create an account
      </Button>
      <Button variant="outline" className="flex w-full items-center gap-2">
        Sign up with GitHub
        <GitHubLogoIcon className="size-5" />
      </Button>
    </form>
  );
}
