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
    const utilities = await buildQuery.call(this.models.utilities, req);
    console.log(utilities);
    return { utilities };
  } catch (err) {
    console.log(err);
    throw Boom.boomify(err, { message: err.message });
  }
  // try {
  //   const utilities = await buildQuery.call(this.models.utilities, req);
  //   return { utilities };
  // } catch (err) {
  //   throw Boom.boomify(err, { message: err.message });
  // }
};

module.exports = {
  method: "GET",
  url: "/",
  // schema,
  handler: getAll
};
