const pool = require("./pool");
import { eq, and, ilike, or, not } from "drizzle-orm";
import { usersTable, posts, userFollow } from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { alias } from "drizzle-orm/pg-core";
import * as schema from "./schema";
import "dotenv/config";

export const db = drizzle(pool, { schema });

async function getAllUsernames() {
  return await db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
    })
    .from(usersTable);
}

async function insertUser(
  firstName: string,
  lastName: string,
  email: string,
  pw: string
) {
  return await db
    .insert(usersTable)
    .values({ firstName, lastName, email, pw })
    .returning({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
    });
}

async function getUserById(userId: string) {
  return await db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      admin: usersTable.admin,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .then((res) => res[0]);
}

async function getUserByName(userName: string) {
  return await db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
    })
    .from(usersTable)
    .where(eq(usersTable.firstName, userName))
    .then((res) => res[0]);
}

async function getUsersByName(userName: string, userId: string) {
  const follows = alias(userFollow, "follows");
  const followedBy = alias(userFollow, "followedBy");

  return await db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      follows: follows.approve,
      following: followedBy.approve,
    })
    .from(usersTable)
    .leftJoin(
      follows,
      and(eq(follows.uid1, userId), eq(follows.uid2, usersTable.id))
    )
    .leftJoin(
      followedBy,
      and(eq(followedBy.uid1, usersTable.id), eq(followedBy.uid2, userId))
    )
    .where(
      and(
        or(
          eq(usersTable.firstName, userName),
          ilike(usersTable.firstName, `${userName}%`),
          ilike(usersTable.firstName, `%${userName}`),
          ilike(usersTable.firstName, `%${userName}%`),
          ilike(usersTable.lastName, `${userName}%`),
          ilike(usersTable.lastName, `%${userName}`),
          ilike(usersTable.lastName, `%${userName}%`)
        ),
        not(eq(usersTable.id, userId))
      )
    );
}

async function getUserByEmail(email: string) {
  return await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .then((res) => res[0]);
}

async function getUsersByEmail(email: string, userId: string) {
  const follows = alias(userFollow, "follows");
  const followedBy = alias(userFollow, "followedBy");

  return await db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      follows: follows.approve,
      followedBy: followedBy.approve,
    })
    .from(usersTable)
    .leftJoin(
      follows,
      and(eq(follows.uid1, userId), eq(follows.uid2, usersTable.id))
    )
    .leftJoin(
      followedBy,
      and(eq(followedBy.uid1, usersTable.id), eq(followedBy.uid2, userId))
    )
    .where(
      and(
        or(eq(usersTable.email, email), ilike(usersTable.email, `%${email}`)),
        not(eq(usersTable.id, userId))
      )
    );
}

async function deleteUserById(id: string) {
  return await db.delete(usersTable).where(eq(usersTable.id, id)).returning({
    id: usersTable.id,
    firstName: usersTable.firstName,
    lastName: usersTable.lastName,
    email: usersTable.email,
  });
}

async function updateUserName(
  newFirstName: string,
  newLastName: string,
  userId: string
) {
  return await db
    .update(usersTable)
    .set({ firstName: newFirstName, lastName: newLastName })
    .where(eq(usersTable.id, userId))
    .returning({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
    });
}

async function updatePassword(userId: string, newPassword: string) {
  return await db
    .update(usersTable)
    .set({ pw: newPassword })
    .where(eq(usersTable.id, userId))
    .returning({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
    });
}

async function createPost(
  title: string,
  distance: string,
  time: string,
  user_id: string
) {
  return await db
    .insert(posts)
    .values({ title, distance, time, user_id })
    .returning();
}

async function queryPosts(currentUser: string) {
  return await db
    .select({
      id: posts.id,
      title: posts.title,
      created: posts.createdAt,
      content: posts.content,
      distance: posts.distance,
      time: posts.time,
      userId: posts.user_id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
    })
    .from(posts)
    .innerJoin(usersTable, eq(posts.user_id, usersTable.id))
    .leftJoin(
      userFollow,
      and(eq(userFollow.uid2, usersTable.id), eq(userFollow.approve, true))
    )
    .where(
      or(
        eq(posts.user_id, currentUser),
        and(eq(userFollow.approve, true), eq(userFollow.uid1, currentUser))
      )
    )
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
      requesterName: usersTable.firstName,
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

async function rejectFollow(reqId: number) {
  return await db.delete(userFollow).where(eq(userFollow.id, reqId));
}

async function retrieveAllFollowers(userId: string) {
  const followBack = alias(userFollow, "followBack");

  return await db
    .select({
      followerId: userFollow.uid1,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
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
  getUsersByName,
  getUserByEmail,
  getUsersByEmail,
  insertUser,
  getUserById,
  updateUserName,
  updatePassword,
  createPost,
  queryPosts,
  sendFollowRequest,
  retrieveFollowRequest,
  approveFollow,
  rejectFollow,
  retrieveAllFollowers,
};
