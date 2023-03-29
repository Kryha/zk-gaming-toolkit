import { ApiError } from "../types";
import { StatusCodes } from "../types/status-codes";

export const apiError = (message: string, status = StatusCodes.INTERNAL_SERVER_ERROR): ApiError => {
  return { httpError: { message, status }, error: new Error(message) };
};
