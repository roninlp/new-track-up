"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "./action";
import { useActionState } from "react";

export function SignOut() {
  const [state, formAction] = useActionState(signOut, null);
  return (
    <form action={formAction}>
      <Button type="submit" variant="destructive">
        Sign out
      </Button>
    </form>
  );
}
