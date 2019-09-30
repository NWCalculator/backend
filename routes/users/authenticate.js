"use strict";
const Boom = require("boom");

const authenticate = async function(req, res) {
  const { Users } = this.models;
  try {
    await Users.query()
      .where({ authToken: req.query.token })
      .patch({ is_active: true })
      .first()
      .throwIfNotFound();
    return res.code(204);
  } catch (err) {
    throw Boom.boomify(err, { message: err.message });
  }
};

module.exports = {
  method: "GET",
  url: "/authenticate",
  handler: authenticate
};
