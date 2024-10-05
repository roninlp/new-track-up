"use server";

import { db } from "@/server/db";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type UserFormState } from "../types";
import { type UserForm, userSchema } from "@/lib/zod-schemas/user-schema";
import { convertZodErrors } from "@/lib/zod-schemas/utils";
import { eq } from "drizzle-orm";
import { users } from "@/server/db/schema";
import { lucia } from "@/server/auth/lucia";

export async function signIn(
  prevState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { success, data, error } = userSchema.safeParse({ email, password });

  if (!success) {
    const errors = convertZodErrors<UserForm>(error);
    return {
      message: "Invalid inputs",
      errors,
      data,
    };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!existingUser) {
    return {
      message: "User not found",
    };
  }

  const validPassword = await verify(existingUser.passwordHash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  if (!validPassword) {
    return {
      message: "Password is invalid",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCoockie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCoockie.name,
    sessionCoockie.value,
    sessionCoockie.attributes,
  );

  return redirect("/signin");
}
