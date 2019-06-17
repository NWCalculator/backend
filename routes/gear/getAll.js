"use strict";
const Boom = require("boom");
const { buildQuery } = require("../../util/helpers");

const getAll = async function(req, res) {
  try {
    const gear = await buildQuery.call(
      this.models.gear,
      req.query.page,
      req.query.limit,
      req.query
    );
    return { gear };
  } catch (err) {
    console.log(err);
    throw Boom.notFound();
  }
};

module.exports = {
  method: "GET",
  url: "/",
  handler: getAll
};
