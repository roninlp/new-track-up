"use server";
import { getUserAndSession, lucia } from "@/server/auth/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut(): Promise<{ error: string }> {
  const { session } = await getUserAndSession();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }
  await lucia.invalidateSession(session.id);
  const sessionCoockie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCoockie.name,
    sessionCoockie.value,
    sessionCoockie.attributes,
  );
  return redirect("/signin");
}
