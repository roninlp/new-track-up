import { type UserForm } from "@/lib/zod-schemas/user-schema";
import { type DeepErrorResult } from "@/lib/zod-schemas/utils";

export type UserFormState = {
  message?: string;
  errors?: DeepErrorResult<UserForm>;
  data?: UserForm;
};
