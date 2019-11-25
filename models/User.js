const Model = require("./Base");
const bcrypt = require("bcrypt");

class User extends Model {
  static get tableName() {
    return "users";
  }

  async verifyPassword(guess) {
    try {
      await bcrypt.compare(this.password, guess);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "email", "password", "activation_code"],
      properties: {
        username: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        activation_code: { type: "string" },
        password_recovery_token: { type: "string" },
        last_login_date: { type: "string" },
        last_login_ip: { type: "string" },
        last_password_recovery: { type: "string" },
        login_attempts: { type: "integer" },
        is_active: { type: "boolean" },
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
