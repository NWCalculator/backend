"use strict";
const Model = require("./Base");

class Weapon extends Model {
  static get tableName() {
    return "weapons";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "type", "grade", "craftmanship"],
      properties: {
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
        weight: { type: "integer" },
        requirements: { type: "object" },
        block_absorption: { type: "integer" },
        base_power: { type: "integer" },
        base_damage: { type: "integer" },
        damage: { type: "object" },
        created_at: { type: "string" },
        updated_at: { type: "string" }
      }
    };
  }
}

module.exports = Weapon;
