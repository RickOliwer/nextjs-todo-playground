ALTER TABLE "todo-app_account" ADD COLUMN "imageUrl" varchar(256);--> statement-breakpoint
ALTER TABLE "todo-app_todos" ADD COLUMN "accountId" integer;--> statement-breakpoint
ALTER TABLE "todo-app_todos" ADD CONSTRAINT "todo-app_todos_accountId_todo-app_account_id_fk" FOREIGN KEY ("accountId") REFERENCES "public"."todo-app_account"("id") ON DELETE no action ON UPDATE no action;