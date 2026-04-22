import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_section" ALTER COLUMN "background_decoration_y_position" SET DEFAULT 'bottom';
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "background_decoration_y_position" SET DEFAULT 'bottom';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_section" ALTER COLUMN "background_decoration_y_position" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "background_decoration_y_position" DROP DEFAULT;`)
}
