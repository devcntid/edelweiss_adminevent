import path from "node:path";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const databaseUrl =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.NEON_DATABASE_URL ||
  "";

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

/**
 * Drizzle 0.30 memanggil klien sebagai `fn(sql, params, opts)`.
 * `neon()` terbaru hanya mengizinkan tagged template di pemanggilan langsung; bentuk konvensional
 * harus lewat `fn.query(sql, params, opts)`.
 */
function neonClientForDrizzle(
  connectionString: string,
): NeonQueryFunction<false, false> {
  const base = neon(connectionString);
  const fn = (query: string, params?: unknown[], opts?: object) =>
    base.query(query, params ?? [], opts as never);
  return Object.assign(fn, {
    query: base.query.bind(base),
    unsafe: base.unsafe.bind(base),
    transaction: base.transaction.bind(base),
  }) as unknown as NeonQueryFunction<false, false>;
}

const migrationsFolder = path.join(process.cwd(), "drizzle", "migrations");

async function main() {
  const db = drizzle(neonClientForDrizzle(databaseUrl));

  console.log("Running Drizzle migrations from", migrationsFolder);
  try {
    await migrate(db, { migrationsFolder });
    console.log("Migrations completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

void main();
