import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "ps" ADD COLUMN "number" numeric;
  ALTER TABLE "_ps_v" ADD COLUMN "number" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "ps" DROP COLUMN "number";
  ALTER TABLE "_ps_v" DROP COLUMN "number";`)
}
