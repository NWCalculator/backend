"use strict";
const Model = require("./Base");

class Gear extends Model {
  static get tableName() {
    return "gear";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "craftmanship", "tier", "grade", "icon", "type"],
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
        grade: { type: "string" },
        craftmanship: { type: "string" },
        defense: { type: "integer" },
        weight: { type: "integer" },
        absorption: { type: "object" },
        resistances: { type: "object" },
        created_at: { type: "string" },
        updated_at: { type: "string" }
      }
    };
  }
}

module.exports = Gear;
