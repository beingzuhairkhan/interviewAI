import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL); 

export const db = drizzle(sql, { schema });
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL || "postgres://postgres:9967705134@localhost:5432/avais",
// });

// export const db = drizzle(pool);
