"use strict";
const fp = require("fastify-plugin");
// const Weapon = require("../models/Weapons");
// const Apparel = require("../models/Apparel");
// const Utility = require("../models/Utilities");
// const Ammo = require("../models/Ammo");
const path = require("path");
const models = require("require-all")({
  dirname: path.resolve(__dirname, "../models"),
  filter: /[^Base\.js]\w*\.js$/,
  // resolve: function(Model) {
  //   return new Model();
  // },
  map: function(name, path) {
    return name.substr(0, name.indexOf(".")).toLowerCase();
  }
});

const handler = function(app, opts, next) {
  app.decorate("models", models);
  next();
};

module.exports = fp(handler);
/[^index\.js]\w*\.js$/;
