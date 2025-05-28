const pool = require("./pool");
import { eq } from "drizzle-orm";
import { usersTable } from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";

export const db = drizzle(pool);

export async function getAllUsernames() {
  return await db.select().from(usersTable);
}

export async function insertUsername(name: string) {
  return await db.insert(usersTable).values({ name }).returning();
}

export async function getUserById(id: string) {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));
  return result[0] ?? null;
}

module.exports = {
  getAllUsernames,
  insertUsername,
  getUserById,
};
