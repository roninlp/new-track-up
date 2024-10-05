import { getUserAndSession } from "@/server/auth/lucia";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export default async function HabitsPage() {
  const { user } = await getUserAndSession();
  const date = new Date();
  if (!user) {
    return (
      <div>
        <p>no user</p>
      </div>
    );
  }

  const habits = await db.query.habits.findMany({
    where: eq(users.id, user.id),
    with: {
      habitRecords: {
        where: (habitRecords, { eq }) => eq(habitRecords.date, date),
        limit: 1,
      },
    },
  });

  return (
    <div>
      <h1>Habits</h1>
    </div>
  );
}
