"use strict";
/* ROUTES */
const m = {};
const routes = require("require-all")({
  dirname: __dirname,
  filter: /[^index\.js]\w*\.js$/,
  recursive: true
});

Object.keys(routes).forEach(key => {
  m[key] = function(app, opts, next) {
    Object.values(routes[key]).forEach(route => {
      app.route(typeof route === "function" ? route(app) : route);
    });
    next();
  };
});

module.exports = m;
