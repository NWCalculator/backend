"use strict";
const Model = require("./Base");

class Builds extends Model {
  static get tableName() {
    return "builds";
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
      properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        title: { type: "string" },
        head_id: { type: "integer" },
        chest_id: { type: "integer" },
        legs_id: { type: "integer" },
        hands_id: { type: "integer" },
        feet_id: { type: "integer" },
        bullet_id: { type: "integer" },
        arrow_id: { type: "integer" },
        token_id: { type: "integer" },
        ring_id: { type: "integer" },
        shield_id: { type: "integer" },
        weapon_1_id: { type: "integer" },
        weapon_2_id: { type: "integer" },
        weapon_3_id: { type: "integer" },
        utility_1_id: { type: "integer" },
        utility_2_id: { type: "integer" },
        utility_3_id: { type: "integer" },
        utility_4_id: { type: "integer" },
        created_at: { type: "string" },
        updated_at: { type: "string" }
      }
    };
  }

  static get relationMappings() {
    const User = require("./User");
    const Apparel = require("./Apparel");
    const Weapons = require("./Weapons");

    return {
      author: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "builds.user_id",
          to: "users.id"
        }
      },
      head: {
        relation: Model.HasOneRelation,
        modelClass: Apparel,
        join: {
          from: "builds.head_id",
          to: "apparen.id"
        }
      },
      chest: {
        relation: Model.HasOneRelation,
        modelClass: Apparel,
        join: {
          from: "builds.chest_id",
          to: "apparel.id"
        }
      },
      legs: {
        relation: Model.HasOneRelation,
        modelClass: Apparel,
        join: {
          from: "builds.legs_id",
          to: "apparel.id"
        }
      },
      hands: {
        relation: Model.HasOneRelation,
        modelClass: Apparel,
        join: {
          from: "builds.hands_id",
          to: "apparel.id"
        }
      },
      feet: {
        relation: Model.HasOneRelation,
        modelClass: Apparel,
        join: {
          from: "builds.feet_id",
          to: "apparel.id"
        }
      },
      bullet: {
        relation: Model.HasOneRelation,
        modelClass: Apparel,
        join: {
          from: "builds.bullet_id",
          to: "ammo.id"
        }
      },
      arrow: {
        relation: Model.HasOneRelation,
        modelClass: Apparel,
        join: {
          from: "builds.arrow_id",
          to: "ammo.id"
        }
      },
      token: {
        relation: Model.HasOneRelation,
        modelClass: Apparel,
        join: {
          from: "builds.token_id",
          to: "apparel.id"
        }
      },
      ring: {
        relation: Model.HasOneRelation,
        modelClass: Apparel,
        join: {
          from: "builds.ring_id",
          to: "apparel.id"
        }
      },
      weaponSlot1: {
        relation: Model.HasOneRelation,
        modelClass: Weapons,
        join: {
          from: "builds.weapon_1_id",
          to: "weapons.id"
        }
      },
      weaponSlot2: {
        relation: Model.HasOneRelation,
        modelClass: Weapons,
        join: {
          from: "builds.weapon_2_id",
          to: "weapons.id"
        }
      },
      weaponSlot3: {
        relation: Model.HasOneRelation,
        modelClass: Weapons,
        join: {
          from: "builds.weapon_3_id",
          to: "weapons.id"
        }
      },
      utilitySlot1: {
        relation: Model.HasOneRelation,
        modelClass: Utility,
        join: {
          from: "utility.utility_1_id",
          to: "utilites.id"
        }
      },
      utilitySlot2: {
        relation: Model.HasOneRelation,
        modelClass: Utility,
        join: {
          from: "utility.utility_2_id",
          to: "utilites.id"
        }
      },
      utilitySlot3: {
        relation: Model.HasOneRelation,
        modelClass: Utility,
        join: {
          from: "utility.utility_3_id",
          to: "utilites.id"
        }
      },
      utilitySlot4: {
        relation: Model.HasOneRelation,
        modelClass: Utility,
        join: {
          from: "utility.utility_4_id",
          to: "utilites.id"
        }
      }
    };
  }
}

module.exports = Builds;
