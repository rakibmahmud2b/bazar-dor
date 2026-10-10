import Database from "better-sqlite3";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

const database = new Database(process.env.BETTER_AUTH_DB_PATH || "./bazardor-auth.sqlite");
const socialProviders = {};
const configuredSecret = process.env.BETTER_AUTH_SECRET;
const hasValidSecret = Boolean(configuredSecret && configuredSecret.length >= 32 && !configuredSecret.startsWith("replace-"));
const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

if (process.env.NODE_ENV === "production" && !hasValidSecret && !isProductionBuild) {
  throw new Error("Set BETTER_AUTH_SECRET to a unique value of at least 32 characters before starting the production server.");
}

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database,
  secret: hasValidSecret ? configuredSecret : "bazardor-local-development-secret-change-before-deploy",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders,
  plugins: [nextCookies()],
});

export function getSocialProviderStatus() {
  return {
    google: Boolean(socialProviders.google),
    github: Boolean(socialProviders.github),
  };
}