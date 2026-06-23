import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("orders", (table) => {
    table.string("applied_promo_code").nullable();
    table.decimal("discount_amount", 10, 2).defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("orders", (table) => {
    table.dropColumn("applied_promo_code");
    table.dropColumn("discount_amount");
  });
}
