const pool = require("./pool");
import { eq } from "drizzle-orm";
import { usersTable } from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import "dotenv/config";

export const db = drizzle(pool, { schema });

export async function getAllUsernames() {
  return await db.select().from(usersTable);
}

export async function insertUsername(name: string) {
  return await db.insert(usersTable).values({ name }).returning();
}

export async function getUserById(userId: string) {
  return await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .then((res) => res[0]);
}

export async function deleteUserByName(name: string) {
  return await db
    .delete(usersTable)
    .where(eq(usersTable.name, name))
    .returning();
}

export async function updateUser(newName: string, userId: string) {
  return await db
    .update(usersTable)
    .set({ name: newName })
    .where(eq(usersTable.id, userId))
    .returning();
}

module.exports = {
  deleteUserByName,
  getAllUsernames,
  insertUsername,
  getUserById,
  updateUser,
};
