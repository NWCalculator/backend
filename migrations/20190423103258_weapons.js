exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable("items").then(exists => {
      if (exists) return;
      return knex.schema.createTable("items", t => {
        t.increments("id").primary();
        t.string("type");
        t.string("category");
        t.string("name").unique();
        t.string("grade");
        t.integer("tier");
        t.integer("gear_score");
        t.string("craftmanship");
        t.string("icon_small");
        t.string("icon_large");
        t.string("attack_type");
        t.string("basic_attack_type");
        t.string("heavy_attack_type");
        t.jsonb("weight");
        t.jsonb("resistances").nullable();
        t.jsonb("absorbtion").nullable();
        t.text("description");
        t.integer("defense").nullable();
        t.integer("base_damage").nullable();
        t.integer("basic_attack_damage").nullable();
        t.integer("heavy_attack_damage").nullable();
        t.float("block_absorbtion").nullable();
        t.jsonb("requirements").nullable();
        t.timestamps();
      });
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTableIfExists("items")]);
};
