"use strict";
const Boom = require("boom");
const { buildQuery } = require("../../util/helpers");

const getAll = async function(req, res) {
  try {
    const weapons = await buildQuery.call(this.models.weapons, req);
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
