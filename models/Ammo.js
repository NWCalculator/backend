const Model = require("./Base");

class Ammo extends Model {
  static get tableName() {
    return "ammo";
  }

  $beforeInsert(context) {
    super.$beforeInsert(context);
  }

  $beforeUpdate(context) {
    super.$beforeUpdate(context);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "craftmanship", "tier", "rarity", "icon", "type"],
      propeties: {
        id: { type: "integer" },
        data_type: { type: "string" },
        name: { type: "string" },
        slug: { type: "string" },
        icon: { type: "string" },
        description: { type: "string" },
        type: { type: "string" },
        tier: { type: "integer" },
        gear_score: { type: "integer" },
        rarity: { type: "string" },
        craftmanship: { type: "string" },
        weight: { type: "integer" },
        damage_modifier: { type: "integer" },
        created_at: { type: "string" },
        updated_at: { type: "string" }
      }
    };
  }
}

module.exports = Ammo;
