import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Mountain } from "lucide-react";
import { getUserAndSession } from "@/server/auth/lucia";
import { SignOut } from "../(auth)/_components/sign-out";

export async function Navbar() {
  const { user } = await getUserAndSession();
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <nav className="flex w-full justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
            <Mountain />
          </Link>
          <Link
            href="/habits"
            className={buttonVariants({ variant: "link" })}
            prefetch={false}
          >
            Habits
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {!user ? (
            <>
              <Button variant="outline">Sign in</Button>
              <Button>Sign Up</Button>
            </>
          ) : (
            <>
              <p>Hi {user.email}</p>
              <SignOut />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
