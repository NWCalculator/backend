"use strict";
const Boom = require("boom");
const { buildQuery } = require("../../util/helpers");

const schema = {
  querystring: {
    type: { type: "string" },
    grade: { type: "string" },
    craftmanship: { type: "string" },
    tier: { type: "integer" }
  },
  response: {
    "2xx": {
      type: "object",
      properties: {
        result: { type: "array" },
        total: { type: "integer" }
      }
    }
  }
};

const getAll = async function(req, res) {
  try {
    const apparel = await buildQuery.call(this.models.apparel, req);
    return { apparel };
  } catch (err) {
    console.log(err);
    throw Boom.notFound();
  }
};

module.exports = {
  method: "GET",
  url: "/",
  // schema,
  handler: getAll
};
