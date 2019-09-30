"use strict";
const fp = require("fastify-plugin");
const path = require("path");
const models = require("require-all")({
  dirname: path.resolve(__dirname, "../models"),
  filter: /[^Base\.js]\w*\.js$/,
  map: function(name, path) {
    return name.substr(0, name.indexOf(".")).toLowerCase();
  }
});

const handler = function(app, opts, next) {
  try {
    app.decorate("models", models);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = fp(handler);
