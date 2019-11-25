"use strict";
/* DEPENDENCIES */
const buildFastify = require("fastify");
const config = require("./knexfile")[process.env.NODE_ENV];
const routes = require("./routes");

const startApp = function() {
  const app = buildFastify({ logger: process.env.NODE_ENV === "development" });
  app.register(require("fastify-cors"), { origin: "*" });
  app.register(require("./util/setup_db"), { knexConfig: { ...config } });
  app.register(require("fastify-jwt"), { secret: process.env.JWT_SECRET });
  app.register(require("fastify-rate-limit"), {
    global: false,
    max: 3000,
    whitelist: ["127.0.0.1"]
  });
  app.register(require("fastify-boom"));
  app.register(require("./util/sanitizer"));
  // app.register(require("./util/mailer"));
  app.register(require("fastify-nodemailer"), {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.TEST_EMAIL_USER,
      pass: process.env.TEST_EMAIL_PASS
    }
  });
  app.get("/", (req, reply) => reply.status(200).send("HELLO WORLD"));

  /* SETUP ROUTES */
  Object.entries(routes).forEach(([namespace, router]) =>
    app.register(router, { prefix: `/v1/${namespace}` })
  );

  return app;
};

module.exports = startApp;
