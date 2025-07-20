const pool = require("./pool");
import { eq, and } from "drizzle-orm";
import { usersTable, posts, userFollow } from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { alias } from "drizzle-orm/pg-core";
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

async function createPost(
  title: string,
  content: string,
  distance: string,
  time: string,
  user_id: string
) {
  return await db
    .insert(posts)
    .values({ title, content, distance, time, user_id })
    .returning();
}

async function queryPosts() {
  return await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      distance: posts.distance,
      time: posts.time,
      userId: posts.user_id,
      userName: usersTable.name,
    })
    .from(posts)
    .innerJoin(usersTable, eq(posts.user_id, usersTable.id))
    .limit(10);
}

async function sendFollowRequest(uid1: string, uid2: string, approve: boolean) {
  return await db
    .insert(userFollow)
    .values({ uid1, uid2, approve })
    .returning();
}

async function retrieveFollowRequest(userId: string) {
  return await db
    .select({
      requestId: userFollow.id,
      followerId: userFollow.uid1,
      requesterName: usersTable.name,
    })
    .from(userFollow)
    .innerJoin(usersTable, eq(userFollow.uid1, usersTable.id))
    .where(and(eq(userFollow.uid2, userId), eq(userFollow.approve, false)));
}

async function approveFollow(reqId: number) {
  return await db
    .update(userFollow)
    .set({ approve: true })
    .where(eq(userFollow.id, reqId));
}

async function rejectFollow(follower: string, userId: string) {
  return await db
    .delete(userFollow)
    .where(and(eq(userFollow.uid1, follower), eq(userFollow.uid2, userId)));
}

async function retrieveAllFollowers(userId: string) {
  const followBack = alias(userFollow, "followBack");

  return await db
    .select({
      followerId: userFollow.uid1,
      name: usersTable.name,
      following: followBack.approve,
    })
    .from(userFollow)
    .innerJoin(usersTable, eq(userFollow.uid1, usersTable.id))
    .leftJoin(
      followBack,
      and(eq(followBack.uid1, userId), eq(followBack.uid2, userFollow.uid1))
    )
    .where(and(eq(userFollow.uid2, userId), eq(userFollow.approve, true)));
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
  queryPosts,
  sendFollowRequest,
  retrieveFollowRequest,
  approveFollow,
  rejectFollow,
  retrieveAllFollowers,
};
