import {
  serial,
  pgTable,
  uuid,
  varchar,
  timestamp,
  unique,
  boolean,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  pw: varchar("pw", { length: 255 }).notNull(),
  admin: boolean("admin").notNull().default(false),
});

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  content: varchar("content"),
  user_id: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp("created_at").defaultNow(),
  distance: varchar("distance", { length: 255 }).notNull(),
  time: varchar("time", { length: 255 }).notNull(),
});

export const userFollow = pgTable(
  "user_follow",
  {
    id: serial("id").primaryKey().notNull(),
    uid1: uuid("uid1")
      .notNull()
      .references(() => usersTable.id),
    uid2: uuid("uid2")
      .notNull()
      .references(() => usersTable.id),
    approve: boolean().notNull(),
  },
  (table) => ({
    uniqueFollow: unique("unique_follow").on(table.uid1, table.uid2),
  })
);
