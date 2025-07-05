// env.ts
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const isCI = process.env.CI === "true";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    CLERK_SECRET_KEY: isCI ? z.string().optional() : z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: isCI
      ? z.string().optional()
      : z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NODE_ENV: process.env.NODE_ENV,
  },

  emptyStringAsUndefined: true,
});
