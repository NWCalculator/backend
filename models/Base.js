const { Model } = require("objection");

class Base extends Model {
  $beforeInsert(context) {
    super.$beforeInsert(context);
    const date = new Date().toISOString();
    this.created_at = date;
  }

  $beforeUpdate(context) {
    super.$beforeUpdate(context);
    const date = new Date().toISOString();
    this.updated_at = date;
  }
}

module.exports = Base;
