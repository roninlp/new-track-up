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
          type="email"
          placeholder="m@example.com"
          required
          value={state.data?.email}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
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
