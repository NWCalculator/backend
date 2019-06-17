"use strict";
const Boom = require("boom");

const { buildQuery } = require("../../util/helpers");

const getAll = async function(req, res) {
  const gearQuery = buildQuery.call(
    this.models.gear,
    req.query.gPage,
    req.query.gLimit,
    req.query
  );

  const weaponQuery = buildQuery.call(
    this.models.weapons,
    req.query.wPage,
    req.query.wLimit,
    req.query
  );

  try {
    const [gear, weapons] = await Promise.all([gearQuery, weaponQuery]);
    return { gear, weapons };
  } catch (err) {
    console.log(err);
    return Boom.boomify(err, { message: err.message });
  }
};

module.exports = {
  method: "GET",
  url: "/",
  handler: getAll
};
