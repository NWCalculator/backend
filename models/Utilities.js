const Model = require("./Base");

class Utility extends Model {
  static get tableName() {
    return "utilities";
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
        absorption: { type: "object" },
        resistances: { type: "object" },
        created_at: { type: "string" },
        updated_at: { type: "string" }
      }
    };
  }
}

module.exports = Utility;
