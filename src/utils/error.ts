import { ApiError, StatusCodes } from "../types";

export const apiError = (message: string, status = StatusCodes.INTERNAL_SERVER_ERROR): ApiError => {
  return { httpError: { message, status }, error: new Error(message) };
};
