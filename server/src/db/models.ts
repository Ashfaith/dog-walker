const pool = require("./pool");
import { eq } from "drizzle-orm";
import { usersTable, posts } from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import "dotenv/config";

export const db = drizzle(pool, { schema });

async function getAllUsernames() {
  return await db.select().from(usersTable);
}

async function insertUser(name: string, email: string, pw: string) {
  return await db.insert(usersTable).values({ name, email, pw }).returning();
}

async function getUserById(userId: string) {
  return await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .then((res) => res[0]);
}

async function getUserByName(userName: string) {
  return await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.name, userName))
    .then((res) => res[0]);
}

async function getUserByEmail(email: string) {
  return await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .then((res) => res[0]);
}

async function deleteUserById(id: string) {
  return await db.delete(usersTable).where(eq(usersTable.id, id)).returning();
}

async function updateUser(newName: string, userId: string) {
  return await db
    .update(usersTable)
    .set({ name: newName })
    .where(eq(usersTable.id, userId))
    .returning();
}

async function updatePassword(newPassword: string, userId: string) {
  return await db
    .update(usersTable)
    .set({ pw: newPassword })
    .where(eq(usersTable.id, userId))
    .returning();
}

async function createPost(title: string, content: string, user_id: string) {
  return await db.insert(posts).values({ title, content, user_id }).returning();
}

module.exports = {
  deleteUserById,
  getAllUsernames,
  getUserByName,
  getUserByEmail,
  insertUser,
  getUserById,
  updateUser,
  updatePassword,
  createPost,
};
