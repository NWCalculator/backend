"use strict";

const Boom = require("boom");

const getSingleBuild = async function(req, reply) {
  const { Build } = this.models;

  const APPAREL = [
    "head",
    "chest",
    "legs",
    "hands",
    "feet",
    "bullet",
    "arrow",
    "token",
    "ring",
    "shield"
  ];
  const WEAPONS = ["weapon_1_id", "weapon_2_id", "weapon_3_id"];
  const UTILITES = [
    "utility_1_id",
    "utility_2_id",
    "utility_3_id",
    "utility_4_id"
  ];

  const query = Build.query()
    .innerJoin("apparel", function() {
      let q;
      APPAREL.forEach((column, i) => {
        if (i === 0) q = this.on("apparel.id", "=", `builds.${column}_id`);
        q = this.orOn("apparel.id", "=", `builds.${column}_id`);
      });
      return q;
    })
    .innerJoin("weapons", function() {
      let q;
      WEAPONS.forEach(column => {
        if (i === 0) q = this.on("weapons.id", "=", `builds.${column}`);
        q = this.orOn("weapons.id", "=", `builds.${column}`);
      });
      return q;
    })
    .innerJoin("utilites", function() {
      let q;
      UTILITES.forEach(column => {
        if (i === 0) q = this.on("weapons.id", "=", `builds.${column}`);
        q = this.orOn("utilites.id", "=", `builds.${column}`);
      });
      return q;
    })
    .where("id", req.params.id);

  try {
    const build = await query;
    return { build };
  } catch (err) {
    return Boom.boomify(err, { message: err.message });
  }
};

module.exports = {
  method: "GET",
  url: "/:id",
  handler: getSingleBuild
};
