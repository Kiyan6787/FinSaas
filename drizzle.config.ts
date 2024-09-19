import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

console.log("Drizzle config is being executed!");

const databaseUrl = process.env.DATABASE_URL;
console.log("Database URL:", databaseUrl ? databaseUrl.replace(/:[^:@]+@/, ':****@') : 'Not set');

if (databaseUrl) {
  try {
    const url = new URL(databaseUrl);
    console.log("Host:", url.hostname);
    console.log("Port:", url.port || 'default');
    console.log("Database:", url.pathname.slice(1));
    console.log("SSL Mode:", url.searchParams.get('sslmode') || 'not specified');
  } catch (error) {
    console.error("Error parsing DATABASE_URL:", error);
  }
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl!,
  },
  verbose: true,
  strict: true,
});

console.log("Drizzle config execution complete!");