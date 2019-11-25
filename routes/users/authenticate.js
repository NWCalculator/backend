"use strict";
const Boom = require("boom");

const authenticate = async function(req, reply) {
  const { user } = this.models;
  try {
    const result = await user
      .query()
      .where({ activation_token: req.params.token, is_active: false })
      .patch({ is_active: true })
      .returning("username")
      .throwIfNotFound();
    return { message: `${result.username} has been activated.` };
  } catch (err) {
    throw Boom.boomify(err, { message: err.message });
  }
};

module.exports = {
  method: "PATCH",
  url: "/authenticate/:token",
  handler: authenticate
};
