import { type HabitType } from "@/server/db/schema";

export function isHabitDueToday(
  habit: HabitType,
  lastCompletionDate: Date,
): boolean {
  const today = new Date();
  const daysSinceLastCompletion = Math.floor(
    (today.getTime() - lastCompletionDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  return daysSinceLastCompletion >= habit.frequency;
}
