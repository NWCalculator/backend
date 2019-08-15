"use strict";
/* DEPENDENCIES */
const buildFastify = require("fastify");
const config = require("./knexfile")[process.env.NODE_ENV];
const routes = require("./routes");

const { Model } = require("objection");

const startApp = function() {
  const app = buildFastify({ logger: process.env.NODE_ENV === "development" });
  app.register(require("fastify-cors"), { origin: "*" });
  app.register(require("fastify-knex"), config).ready(err => {
    if (err) throw err;
    if (!app.knex) throw Error("knex not found");
    Model.knex(app.knex);
  });
  app.register(require("fastify-boom"));
  app.register(require("./util/injectModels"));
  app.register(require("./util/sanitizer"));
  app.get("/", (req, reply) => reply.status(200).send("HELLO WORLD"));

  /* SETUP ROUTES */
  Object.entries(routes).forEach(([namespace, router]) =>
    app.register(router, { prefix: `/v1/${namespace}` })
  );
  return app;
};

module.exports = startApp;
