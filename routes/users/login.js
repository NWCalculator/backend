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

  const { jwt } = this;

  console.log(req.body);

  try {
    user = await this.models.user
      .query()
      .where({
        is_active: true,
        email: req.body.email
      })
      .select("username", "id")
      .first()
      .throwIfNotFound()
      .returning(["username", "id", "email"]);
  } catch (err) {
    throw Boom.notFound("User record doesn't exist.");
  }

  if (!(await user.verifyPassword(req.body.password))) {
    throw Boom.badData("Incorrect user credentials.");
  }

  try {
    const token = jwt.sign({ user });

    reply
      .code(200)
      // .header(
      //   "Access-Control-Expose-Headers",
      //   "Authorization",
      //   "Content-Type",
      //   "Content-Length"
      // )
      .header("Authorization", `Bearer ${token}`)
      .send({ message: `Logged in as ${user.username}` });
  } catch (err) {
    console.log(err);
    throw Boom.boomify(err, { message: err.message });
  }
};

module.exports = {
  method: "POST",
  // schema,
  // schemaCompiler: schema => data => schema.validate(data),
  config: {
    rateLimit: {
      max: 5,
      timeWindow: "1 minute"
    }
  },
  url: "/login",
  handler: login
};
