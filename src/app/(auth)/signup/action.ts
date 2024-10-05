"use server";

import { lucia } from "@/server/auth/lucia";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type UserFormState } from "../types";
import { type UserForm, userSchema } from "@/lib/zod-schemas/user-schema";
import { convertZodErrors } from "@/lib/zod-schemas/utils";

export async function signUp(
  prevState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("email: ", email);
  console.log("pass: ", password);
  const { success, data, error } = userSchema.safeParse({ email, password });

  if (!success) {
    const errors = convertZodErrors<UserForm>(error);
    return {
      message: "Invalid inputs",
      errors,
      data,
    };
  }

  const userAlreadyExists = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!!userAlreadyExists) {
    return {
      message: "User already exists",
      data,
    };
  }

  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const userId = generateIdFromEntropySize(10);

  await db.insert(users).values({
    id: userId,
    email,
    passwordHash,
  });

  const session = await lucia.createSession(userId, {});
  const sessionCoockie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCoockie.name,
    sessionCoockie.value,
    sessionCoockie.attributes,
  );

  return redirect("/");
}
