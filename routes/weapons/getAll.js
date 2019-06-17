"use strict";
const Boom = require("boom");
const { buildQuery } = require("../../util/helpers");

const getAll = async function(req, res) {
  try {
    const weapons = await buildQuery.call(
      this.models.weapons,
      req.query.page,
      req.query.limit,
      req.query
    );
    return { weapons };
  } catch {
    throw Boom.notFound();
  }
};

module.exports = {
  method: "GET",
  url: "/",
  handler: getAll
};
