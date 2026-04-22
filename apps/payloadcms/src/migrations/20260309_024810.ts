import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_section_background_decoration" AS ENUM('blurred-logo', 'radial-glow');
  CREATE TYPE "public"."enum_pages_blocks_section_background_decoration_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_section_background_decoration" AS ENUM('blurred-logo', 'radial-glow');
  CREATE TYPE "public"."enum__pages_v_blocks_section_background_decoration_position" AS ENUM('left', 'right');
  ALTER TABLE "pages_blocks_section" ADD COLUMN "background_decoration_toggle" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_section" ADD COLUMN "background_decoration" "enum_pages_blocks_section_background_decoration";
  ALTER TABLE "pages_blocks_section" ADD COLUMN "background_decoration_position" "enum_pages_blocks_section_background_decoration_position";
  ALTER TABLE "_pages_v_blocks_section" ADD COLUMN "background_decoration_toggle" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_section" ADD COLUMN "background_decoration" "enum__pages_v_blocks_section_background_decoration";
  ALTER TABLE "_pages_v_blocks_section" ADD COLUMN "background_decoration_position" "enum__pages_v_blocks_section_background_decoration_position";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_section" DROP COLUMN "background_decoration_toggle";
  ALTER TABLE "pages_blocks_section" DROP COLUMN "background_decoration";
  ALTER TABLE "pages_blocks_section" DROP COLUMN "background_decoration_position";
  ALTER TABLE "_pages_v_blocks_section" DROP COLUMN "background_decoration_toggle";
  ALTER TABLE "_pages_v_blocks_section" DROP COLUMN "background_decoration";
  ALTER TABLE "_pages_v_blocks_section" DROP COLUMN "background_decoration_position";
  DROP TYPE "public"."enum_pages_blocks_section_background_decoration";
  DROP TYPE "public"."enum_pages_blocks_section_background_decoration_position";
  DROP TYPE "public"."enum__pages_v_blocks_section_background_decoration";
  DROP TYPE "public"."enum__pages_v_blocks_section_background_decoration_position";`)
}
