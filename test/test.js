"use strict";

require("dotenv").config();

const buildFastify = require("../app");
const apparel = require("./lib/items.spec.js");
const user = require("./lib/users.spec.js");

let app = buildFastify();

describe("TEST routes", function() {
  apparel(app);
  user(app);
  after("after all tests are finished", async function() {
    app.close();
    app = null;
  });
});
