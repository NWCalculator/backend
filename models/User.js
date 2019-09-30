const Model = require("./Base");
const Password = require("objection-password")();

class User extends Password(Model) {
  static get tableName() {
    return "users";
  }

  $beforeInsert(context) {
    super.$beforeInsert(context);
    this.password = securePassword(this.password);
  }

  $beforeUpdate(context) {
    super.$beforeUpdate(context);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "username", "forum_name", "email", "password"],
      propeties: {
        id: { type: "integer" },
        name: { type: "string" },
        username: { type: "string" },
        forum_name: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        last_login: { type: "string" },
        last_login_ip: { type: "string" },
        login_attempts: { type: "integer" },
        last_password_recovery: { type: "string" },
        password_recovery_token: { type: "string" },
        is_admin: { type: "boolean" },
        is_curator: { type: "boolean" },
        is_deactivated: { type: "boolean" },
        created_at: { type: "string" },
        updated_at: { type: "string" }
      }
    };
  }

  static get relationalMappings() {
    const Builds = require("./Builds");
    return {
      builds: {
        relation: Model.ManyToManyThroughRelation,
        modelClass: Builds,
        join: {
          from: "users.id",
          through: {
            from: "user_builds.user_id",
            to: "user_builds.build_id"
          },
          to: "builds.id"
        }
      }
    };
  }
}

module.exports = User;
