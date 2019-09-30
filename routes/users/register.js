"use strict";
const Boom = require("boom");
const Joi = require("@hapi/joi");
const crypto = require("crypto");

const schema = {
  body: {
    credentials: Joi.object()
      .keys({
        username: Joi.string()
          .alphanum()
          .min(3)
          .max(20)
          .required(),
        password: Joi.string()
          .pattern(/^[a-zA-Z0-9]{3, 20}$/)
          .required(),
        confirm_password: Joi.ref("password"),
        email: Joi.string().email({ minDomainSegments: 2 })
      })
      .required()
  }
};

const register = async function(req, res) {
  const { Users } = this.models;
  const { sendMockMail } = this.mail;

  let authToken = null,
    email = null;

  try {
    authToken = crypto.randomBytes(16).toString("hex");
    await Users.query().insert({
      ...req.body.credentials,
      authToken
    });
  } catch (err) {
    if (err.code === "23505") {
      throw Boom.badRequest("User already exists.");
    }
    throw Boom.boomify(err, { message: err.message });
  }

  try {
    await sendMockMail(
      req.body.credentials.email,
      "noreply@nwcalculator.com",
      "Activation Code",
      `http://localhost:8080/u/activate?authToken=${authToken}`
    );
    return {
      message: `Activation email sent to ${req.body.credentials.email}`
    };
  } catch (err) {
    throw Boom.boomify(err, { message: err.message });
  }
};

module.exports = {
  method: "POST",
  schema,
  schemaCompiler: schema => data => Joi.validate(data, schema),
  url: "/register",
  handler: register
};
