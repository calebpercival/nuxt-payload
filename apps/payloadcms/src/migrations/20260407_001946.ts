import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "ps" ALTER COLUMN "description" SET DATA TYPE jsonb USING description::jsonb;
  ALTER TABLE "_ps_v" ALTER COLUMN "description" SET DATA TYPE jsonb USING description::jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "ps" ALTER COLUMN "description" SET DATA TYPE varchar USING description::text;
  ALTER TABLE "_ps_v" ALTER COLUMN "description" SET DATA TYPE varchar USING description::text;`)
}