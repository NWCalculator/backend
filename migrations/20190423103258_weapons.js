exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable("weapons").then(exists => {
      if (exists) return;
      return knex.schema.createTable("weapons", t => {
        t.increments("id").primary();
        t.string("type");
        t.string("category");
        t.string("name");
        t.string("grade");
        t.integer("tier");
        t.integer("gear_score");
        t.string("craftmanship");
        t.string("icon_small");
        t.string("icon_large");
        t.jsonb("attack_damage");
        t.jsonb("weight");
        t.text("description");
        t.float("block_absorbtion").nullable();
        t.jsonb("requirements").nullable();
        t.timestamps();
      });
    }),
    knex.schema.hasTable("gear").then(exists => {
      if (exists) return;
      return knex.schema.createTable("gear", t => {
        t.increments("id").primary();
        t.string("type");
        t.string("category");
        t.text("description");
        t.string("name");
        t.string("grade");
        t.integer("tier");
        t.integer("gear_score");
        t.string("craftmanship");
        t.string("icon_small");
        t.string("icon_large");
        t.jsonb("weight");
        t.jsonb("resistances").nullable();
        t.jsonb("absorption").nullable();
        t.integer("defense").nullable();
        t.timestamps();
      });
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTableIfExists("items")]);
};
