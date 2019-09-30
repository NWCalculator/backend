"use strict";
const Boom = require("boom");
const Joi = require("@hapi/joi");

const schema = {
  body: Joi.object()
    .keys({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3, 20}$/)
        .required()
    })
    .required()
};

const login = async function(req, reply) {
  let login_attempts = 0,
    user = null;

  try {
    user = await this.models.user
      .query()
      .where({
        is_active: true,
        email: req.body.email
      })
      .first()
      .throwIfNotFound();
  } catch (err) {
    throw Boom.notFound("User record doesn't exist.");
  }

  try {
    if (user && (await user.verifyPassword(req.query.password))) {
      return { user };
    }
  } catch (err) {
    throw Boom.badData("Invalid Credentials.");
  }
};

module.exports = {
  method: "POST",
  schema,
  schemaCompiler: schema => data => Joi.validate(data, schema),
  config: {
    rateLimit: {
      max: 5,
      timeWindow: "1 minute"
    }
  },
  url: "/login",
  handler: login
};
