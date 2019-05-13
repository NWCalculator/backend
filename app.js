"use strict";
/* DEPENDENCIES */
const buildFastify = require("fastify");
const config = require("./knexfile")[process.env.NODE_ENV];

const { Model } = require("objection");

const startApp = function() {
  const app = buildFastify({ logger: process.env.NODE_ENV === "development" });
  app.register(require("fastify-knex"), config).ready(err => {
    if (err) console.log(err);
    Model.knex(config);
  });
  app.register(require("fastify-boom"));

  app.get("/", (req, reply) => reply.status(200).send("HELLO WORLD"));
  return app;
};

module.exports = startApp;
