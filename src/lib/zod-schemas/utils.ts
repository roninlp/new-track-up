import { type ZodError } from "zod";

export type DeepErrorResult<T> =
  T extends Array<infer U>
    ? { [key: number]: DeepErrorResult<U> }
    : T extends object
      ? { [K in keyof T]?: DeepErrorResult<T[K]> }
      : string;

type ErrorNode = {
  [key: string]: ErrorNode | string;
};

export function convertZodErrors<T>(error: ZodError<T>): DeepErrorResult<T> {
  const errors = {} as ErrorNode;

  for (const issue of error.issues) {
    let currentObj: ErrorNode = errors;
    const pathLength = issue.path.length;

    issue.path.forEach((key, index) => {
      const isLastKey = index === pathLength - 1;
      const stringKey = String(key);

      if (!isLastKey) {
        if (!(stringKey in currentObj)) {
          currentObj[stringKey] = {};
        }
        currentObj = currentObj[stringKey] as ErrorNode;
      } else {
        currentObj[stringKey] = issue.message;
      }
    });
  }

  return errors as DeepErrorResult<T>;
}
