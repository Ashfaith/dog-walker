CREATE TABLE "user_follow" (
	"id" serial PRIMARY KEY NOT NULL,
	"uid1" uuid NOT NULL,
	"uid2" uuid NOT NULL,
	"status" text NOT NULL,
	CONSTRAINT "chk_friend" CHECK ("user_follow"."uid1" < "user_follow"."uid2")
);
--> statement-breakpoint
ALTER TABLE "user_follow" ADD CONSTRAINT "user_follow_uid1_users_id_fk" FOREIGN KEY ("uid1") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_follow" ADD CONSTRAINT "user_follow_uid2_users_id_fk" FOREIGN KEY ("uid2") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;