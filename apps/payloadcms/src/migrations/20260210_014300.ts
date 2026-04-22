import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_button" ALTER COLUMN "button_style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "button_style" SET DEFAULT 'solid'::text;
  DROP TYPE "public"."enum_pages_blocks_button_button_style";
  CREATE TYPE "public"."enum_pages_blocks_button_button_style" AS ENUM('solid', 'outline');
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "button_style" SET DEFAULT 'solid'::"public"."enum_pages_blocks_button_button_style";
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "button_style" SET DATA TYPE "public"."enum_pages_blocks_button_button_style" USING "button_style"::"public"."enum_pages_blocks_button_button_style";
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "top_divider" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "top_divider" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum_pages_blocks_section_top_divider";
  CREATE TYPE "public"."enum_pages_blocks_section_top_divider" AS ENUM('none', 'fade');
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "top_divider" SET DEFAULT 'none'::"public"."enum_pages_blocks_section_top_divider";
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "top_divider" SET DATA TYPE "public"."enum_pages_blocks_section_top_divider" USING "top_divider"::"public"."enum_pages_blocks_section_top_divider";
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "bottom_divider" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "bottom_divider" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum_pages_blocks_section_bottom_divider";
  CREATE TYPE "public"."enum_pages_blocks_section_bottom_divider" AS ENUM('none', 'fade');
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "bottom_divider" SET DEFAULT 'none'::"public"."enum_pages_blocks_section_bottom_divider";
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "bottom_divider" SET DATA TYPE "public"."enum_pages_blocks_section_bottom_divider" USING "bottom_divider"::"public"."enum_pages_blocks_section_bottom_divider";
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "button_style" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "button_style" SET DEFAULT 'solid'::text;
  DROP TYPE "public"."enum__pages_v_blocks_button_button_style";
  CREATE TYPE "public"."enum__pages_v_blocks_button_button_style" AS ENUM('solid', 'outline');
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "button_style" SET DEFAULT 'solid'::"public"."enum__pages_v_blocks_button_button_style";
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "button_style" SET DATA TYPE "public"."enum__pages_v_blocks_button_button_style" USING "button_style"::"public"."enum__pages_v_blocks_button_button_style";
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "top_divider" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "top_divider" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum__pages_v_blocks_section_top_divider";
  CREATE TYPE "public"."enum__pages_v_blocks_section_top_divider" AS ENUM('none', 'fade');
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "top_divider" SET DEFAULT 'none'::"public"."enum__pages_v_blocks_section_top_divider";
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "top_divider" SET DATA TYPE "public"."enum__pages_v_blocks_section_top_divider" USING "top_divider"::"public"."enum__pages_v_blocks_section_top_divider";
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "bottom_divider" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "bottom_divider" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum__pages_v_blocks_section_bottom_divider";
  CREATE TYPE "public"."enum__pages_v_blocks_section_bottom_divider" AS ENUM('none', 'fade');
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "bottom_divider" SET DEFAULT 'none'::"public"."enum__pages_v_blocks_section_bottom_divider";
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "bottom_divider" SET DATA TYPE "public"."enum__pages_v_blocks_section_bottom_divider" USING "bottom_divider"::"public"."enum__pages_v_blocks_section_bottom_divider";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_button" ALTER COLUMN "button_style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "button_style" SET DEFAULT 'light'::text;
  DROP TYPE "public"."enum_pages_blocks_button_button_style";
  CREATE TYPE "public"."enum_pages_blocks_button_button_style" AS ENUM('light', 'dark');
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "button_style" SET DEFAULT 'light'::"public"."enum_pages_blocks_button_button_style";
  ALTER TABLE "pages_blocks_button" ALTER COLUMN "button_style" SET DATA TYPE "public"."enum_pages_blocks_button_button_style" USING "button_style"::"public"."enum_pages_blocks_button_button_style";
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "top_divider" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "top_divider" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum_pages_blocks_section_top_divider";
  CREATE TYPE "public"."enum_pages_blocks_section_top_divider" AS ENUM('none', 'diagonal-up', 'diagonal-down');
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "top_divider" SET DEFAULT 'none'::"public"."enum_pages_blocks_section_top_divider";
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "top_divider" SET DATA TYPE "public"."enum_pages_blocks_section_top_divider" USING "top_divider"::"public"."enum_pages_blocks_section_top_divider";
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "bottom_divider" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "bottom_divider" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum_pages_blocks_section_bottom_divider";
  CREATE TYPE "public"."enum_pages_blocks_section_bottom_divider" AS ENUM('none', 'diagonal-up', 'diagonal-down');
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "bottom_divider" SET DEFAULT 'none'::"public"."enum_pages_blocks_section_bottom_divider";
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "bottom_divider" SET DATA TYPE "public"."enum_pages_blocks_section_bottom_divider" USING "bottom_divider"::"public"."enum_pages_blocks_section_bottom_divider";
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "button_style" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "button_style" SET DEFAULT 'light'::text;
  DROP TYPE "public"."enum__pages_v_blocks_button_button_style";
  CREATE TYPE "public"."enum__pages_v_blocks_button_button_style" AS ENUM('light', 'dark');
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "button_style" SET DEFAULT 'light'::"public"."enum__pages_v_blocks_button_button_style";
  ALTER TABLE "_pages_v_blocks_button" ALTER COLUMN "button_style" SET DATA TYPE "public"."enum__pages_v_blocks_button_button_style" USING "button_style"::"public"."enum__pages_v_blocks_button_button_style";
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "top_divider" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "top_divider" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum__pages_v_blocks_section_top_divider";
  CREATE TYPE "public"."enum__pages_v_blocks_section_top_divider" AS ENUM('none', 'diagonal-up', 'diagonal-down');
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "top_divider" SET DEFAULT 'none'::"public"."enum__pages_v_blocks_section_top_divider";
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "top_divider" SET DATA TYPE "public"."enum__pages_v_blocks_section_top_divider" USING "top_divider"::"public"."enum__pages_v_blocks_section_top_divider";
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "bottom_divider" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "bottom_divider" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum__pages_v_blocks_section_bottom_divider";
  CREATE TYPE "public"."enum__pages_v_blocks_section_bottom_divider" AS ENUM('none', 'diagonal-up', 'diagonal-down');
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "bottom_divider" SET DEFAULT 'none'::"public"."enum__pages_v_blocks_section_bottom_divider";
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "bottom_divider" SET DATA TYPE "public"."enum__pages_v_blocks_section_bottom_divider" USING "bottom_divider"::"public"."enum__pages_v_blocks_section_bottom_divider";`)
}
