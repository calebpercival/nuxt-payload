import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_section_background_decoration_y_position" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum__pages_v_blocks_section_background_decoration_y_position" AS ENUM('top', 'center', 'bottom');
  ALTER TABLE "pages_blocks_section" ADD COLUMN "background_decoration_y_position" "enum_pages_blocks_section_background_decoration_y_position";
  ALTER TABLE "_pages_v_blocks_section" ADD COLUMN "background_decoration_y_position" "enum__pages_v_blocks_section_background_decoration_y_position";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_section" DROP COLUMN "background_decoration_y_position";
  ALTER TABLE "_pages_v_blocks_section" DROP COLUMN "background_decoration_y_position";
  DROP TYPE "public"."enum_pages_blocks_section_background_decoration_y_position";
  DROP TYPE "public"."enum__pages_v_blocks_section_background_decoration_y_position";`)
}
