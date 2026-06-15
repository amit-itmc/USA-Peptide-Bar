import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("site_settings", (table) => {
    table.increments("id").primary();
    table.string("setting_key").notNullable().unique();
    table.text("setting_value").nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("site_settings");
}
