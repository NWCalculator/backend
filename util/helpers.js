"use strict";

const pick = require("object.pick");

module.exports.buildQuery = async function(req) {
  const qb = this;

  let query = qb.query().throwIfNotFound();

  let page = req.query.page ? parseInt(req.query.page, 10) : 1,
    limit = req.query.limit ? parseInt(req.query.limit, 10) : 20;

  let start = (page - 1) * limit,
    end = page * limit - 1;

  query = query.range(start, end);

  if (Object.keys(req.query).length) {
    const filters = pick(req.query, ["type", "tier", "rarity", "craftmanship"]);

    Object.entries(filters).forEach(([name, data]) => {
      if (data) {
        if (Array.isArray(data) && data.length) {
          query = query.whereIn(name, data);
        } else {
          query = query.where(name, data);
        }
      }
    });
  }

  return query;
};
