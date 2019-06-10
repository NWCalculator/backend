"use strict";
const Boom = require("boom");
const pick = require("object.pick");

const getAll = async function(req, res) {
  const Weapon = this.models.weapons;

  let query = Weapon.query().throwIfNotFound();

  let page = req.query.page ? parseInt(req.query.page, 10) : 1,
    limit = req.query.limit ? parseInt(req.query.limit, 10) : 20;

  let start = (page - 1) * limit,
    end = page * limit - 1;

  query = query.range(start, end);

  if (Object.keys(req.query).length) {
    const filters = pick(req.query, ["type", "tier", "grade", "craftmanship"]);

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

  try {
    const weapons = await query;
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
