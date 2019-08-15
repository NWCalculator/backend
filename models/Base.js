"use strict";
const { Model } = require("objection");

const date = new Date().toISOString();

class Base extends Model {
  $beforeInsert(context) {
    super.$beforeInsert(context);

    this.created_at = date;
  }

  $beforeUpdate(context) {
    super.$beforeUpdate(context);

    this.updated_at = date;
  }
}

module.exports = Base;
