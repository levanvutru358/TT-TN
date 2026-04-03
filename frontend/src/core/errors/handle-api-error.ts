import { mapUnknownError } from "@/core/errors/error-mapper";

export const handleApiError = (error: unknown) => {
  throw mapUnknownError(error);
};
