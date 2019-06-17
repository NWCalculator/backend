"use strict";

module.exports.buildQuery = async function(_page, _limit, obj) {
  const qb = this;

  let query = qb.query().throwIfNotFound();

  let page = _page ? parseInt(_page, 10) : 1,
    limit = _limit ? parseInt(_limit, 10) : 20;

  let start = (page - 1) * limit,
    end = page * limit - 1;

  query = query.range(start, end);

  if (Object.keys(obj).length) {
    const filters = pick(obj, ["type", "tier", "grade", "craftmanship"]);

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
