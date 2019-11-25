"use strict";
const Boom = require("boom");
const Joi = require("@hapi/joi");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { verifyRecaptcha } = require("../../util/helpers");

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
  const { nodemailer } = this;

  let code = null,
    email = null;

  try {
    const captcha = await verifyRecaptcha(
      process.env.REPCATCHA_SECRET,
      req.body.recaptchaResponse
    );
    console.log(captcha);
  } catch (err) {
    console.log(err);
    throw Boom.badData(err);
  }

  try {
    const salt = await bcrypt.genSalt(12);
    const password = await bcrypt.hash(req.body.credentials.password, salt);

    code = crypto.randomBytes(16).toString("hex");

    await this.models.user
      .query()
      .insert({
        username: req.body.credentials.username,
        email: req.body.credentials.email,
        password,
        activation_code: code
      })
      .first()
      .returning("email");
  } catch (err) {
    console.log(err);
    if (err.code === "23505") {
      throw Boom.badRequest("User already exists.");
    }
    throw Boom.boomify(err, { message: err.message });
  }

  try {
    const info = await nodemailer.sendMail({
      from: "noreply@nwcalculator.com",
      to: req.body.credentials.email,
      subject: "Activation Code",
      text: `http://localhost:3000/authenticate/${code}`
    });

    console.log(info);

    return {
      message: `Activation email send to ${req.body.credentials.email}`
    };
  } catch (err) {
    console.log(err);
    throw Boom.internal(err);
  }
};

module.exports = {
  method: "POST",
  // schema,
  // schemaCompiler: schema => data => schema.validate(data),
  url: "/register",
  handler: register
};
