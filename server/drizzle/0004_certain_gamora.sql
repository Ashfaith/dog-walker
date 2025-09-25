ALTER TABLE "users" RENAME COLUMN "is_admin" TO "admin";--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "image_url" uuid;