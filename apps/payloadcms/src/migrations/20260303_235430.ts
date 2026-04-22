import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_jobs_style" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__pages_v_blocks_jobs_style" AS ENUM('grid', 'list');
  CREATE TABLE "pages_blocks_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_jobs_style" DEFAULT 'grid',
  	"limit" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_jobs_style" DEFAULT 'grid',
  	"limit" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_jobs" ADD CONSTRAINT "pages_blocks_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_jobs" ADD CONSTRAINT "_pages_v_blocks_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_jobs_order_idx" ON "pages_blocks_jobs" USING btree ("_order");
  CREATE INDEX "pages_blocks_jobs_parent_id_idx" ON "pages_blocks_jobs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_jobs_path_idx" ON "pages_blocks_jobs" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_jobs_order_idx" ON "_pages_v_blocks_jobs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_jobs_parent_id_idx" ON "_pages_v_blocks_jobs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_jobs_path_idx" ON "_pages_v_blocks_jobs" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_jobs" CASCADE;
  DROP TABLE "_pages_v_blocks_jobs" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_jobs_style";
  DROP TYPE "public"."enum__pages_v_blocks_jobs_style";`)
}
