import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getUserAndSession } from "@/server/auth/lucia";
import { SignInForm } from "./signin-form";
import { SignOut } from "../_components/sign-out";

export default async function SignIn() {
  const { user } = await getUserAndSession();

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          {!!user ? "Already Logged In" : "Enter your email below to login to your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!!user ? (
          <div>
            {user?.email}
            <SignOut />
          </div>
        ) : (
          <>
            <SignInForm />
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
