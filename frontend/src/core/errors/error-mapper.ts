import { AppError } from "@/core/errors/app-error";

export const mapUnknownError = (error: unknown) => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message);
  }

  return new AppError("Unexpected error");
};
