export const NODE_ENV = process.env.NODE_ENV || "development";
export const NODE_PATH = process.env.NODE_PATH!;

export const PORT = Number(process.env.PORT) || "5001";
export const BASE_URL = `localhost:${PORT}`;
export const CORS_ORIGINS = process.env.CORS_ORIGINS?.split(",") || ["http://localhost:3000", "http://localhost:3001"];

export const DELETE_PAYLOAD = { message: "deleted" };
