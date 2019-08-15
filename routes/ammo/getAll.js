"use strict";
const Boom = require("boom");
const { buildQuery } = require("../../util/helpers");

const schema = {
  querystring: {
    page: { type: "integer" },
    limit: { type: "integer" },
    type: { type: "string" },
    grade: { type: "string" },
    craftmanship: { type: "string" },
    tier: { type: "integer" }
  },
  response: {
    "2xx": {
      type: "object",
      properties: {
        ammo: {
          type: "object",
          properties: {
            results: { type: "array" },
            total: { type: "integer" }
          }
        }
      }
    }
  }
};

const getAll = async function(req, res) {
  try {
    const ammo = await buildQuery.call(this.models.ammo, req);
    return { ammo };
  } catch (err) {
    throw Boom.boomify(err, { message: err.message });
  }
};

module.exports = {
  method: "GET",
  url: "/",
  // schema,
  handler: getAll
};
