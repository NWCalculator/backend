"use strict";
const fp = require("fastify-plugin");
const Weapon = require("../models/Weapons");
const Gear = require("../models/Gear");

const handler = function(app, opts, next) {
  app.decorate("models", {
    weapons: Weapon,
    gear: Gear
  });
  next();
};

module.exports = fp(handler);
