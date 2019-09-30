"use strict";
const path = require("path");
const fp = require("fastify-plugin");
const fs = require("fs");

const Knex = require("knex");

const { Model } = require("objection");

const supported = [
  "postgresql",
  "pg",
  "sqlite3",
  "mysql",
  "mysql2",
  "oracale",
  "mssql"
];

const models = require("require-all")({
  dirname: path.resolve(__dirname, "../models"),
  filter: /[^Base\.js]\w*\.js$/,
  map: function(name, path) {
    return name.substr(0, name.indexOf(".")).toLowerCase();
  }
});

const defaultKnexConfig = {
  client: "postgresql",
  connection: {
    database: "nw_calc",
    user: "helix",
    password: "hihi00hihi"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};

function setup(app, opts, next) {
  if (supported.indexOf(opts.client) !== -1) {
    next(
      new Error(
        `unsupported client. The following clients are supported: ${supported.join(
          ", "
        )}.`
      )
    );
  }

  const config = Object.assign({}, defaultKnexConfig, opts.knexConfig);

  const connection = Knex(config);

  Model.knex(connection);

  if (!app.knex) {
    app.decorate("knex", connection);
  }

  if (!app.models) {
    app.decorate("models", models);
  }

  next();
}

module.exports = fp(setup);
