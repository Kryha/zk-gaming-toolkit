export const NODE_ENV = process.env.NODE_ENV || "development";

export const PORT = Number(process.env.PORT) || "5001";
export const CORS_ORIGINS = process.env.CORS_ORIGINS?.split(",") || ["http://localhost:3000", "http://localhost:3001"];
