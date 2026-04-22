import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_jobs_style" RENAME TO "enum_pages_blocks_jobs_jobs_style";
  ALTER TYPE "public"."enum__pages_v_blocks_jobs_style" RENAME TO "enum__pages_v_blocks_jobs_jobs_style";
  ALTER TABLE "pages_blocks_jobs" RENAME COLUMN "style" TO "jobs_style";
  ALTER TABLE "_pages_v_blocks_jobs" RENAME COLUMN "style" TO "jobs_style";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_jobs_jobs_style" RENAME TO "enum_pages_blocks_jobs_style";
  ALTER TYPE "public"."enum__pages_v_blocks_jobs_jobs_style" RENAME TO "enum__pages_v_blocks_jobs_style";
  ALTER TABLE "pages_blocks_jobs" RENAME COLUMN "jobs_style" TO "style";
  ALTER TABLE "_pages_v_blocks_jobs" RENAME COLUMN "jobs_style" TO "style";`)
}
