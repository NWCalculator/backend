"use strict";
const faker = require("faker");
const { expect } = require("chai");

const payload = {
  credentials: {
    email: "h3lix0@gmail.com",
    password: "hihi00hihi",
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    forum_name: faker.internet.userName(),
    username: faker.internet.userName()
  }
};

let activation_token = null,
  login_token = null;

module.exports = function(app) {
  describe("TEST user creation and authentication", function() {
    before(async function() {
      try {
        await app.knex
          .raw("TRUNCATE users RESTART IDENTITY CASCADE")
          .catch(err => console.log(err));
      } catch (err) {
        console.log(err);
      }
    });

    after(function() {
      process.exit(0);
    });

    describe("POST /register", function() {
      it("should send back a 200 status code with a message indicating an email has been dispatched", async function() {
        let result = null,
          request = null,
          newUser = null;

        const { user } = app.models;

        try {
          request = await app.inject({
            method: "POST",
            url: "/v1/users/register",
            payload
          });

          newUser = await user
            .query()
            .where({ username: payload.credentials.username })
            .select("username", "email", "activation_token")
            .first();

          activation_token = newUser.activation_token;

          result = JSON.parse(request.payload);
        } catch (err) {
          console.log(err);
        }

        expect(request.statusCode).to.equal(200);
        expect(result.message).to.be.an("string");
        expect(newUser).to.have.deep.property(
          "email",
          payload.credentials.email
        );
      });
    });

    describe("PATCH /authenticate", function() {
      it("should activate the account and send back a 200 status code", async function() {
        const { user } = app.models;

        let request, u;

        try {
          request = await app.inject({
            method: "PATCH",
            url: `/v1/users/authenticate/${activation_token}`
          });

          u = await user
            .query()
            .where({ username: payload.credentials.username })
            .select("is_active")
            .first()
            .throwIfNotFound();
        } catch (err) {
          console.log(err);
        }

        expect(request.statusCode).to.equal(200);
        expect(u).to.have.deep.property("is_active", true);
      });
    });

    describe("POST /login", function() {
      it("should send a status 200 along with a token in the header", async function() {
        const request = await app.inject({
          method: "POST",
          url: "/v1/users/login",
          payload: {
            email: payload.credentials.email,
            password: payload.credentials.password
          }
        });

        expect(request.statusCode).to.equal(200);
        expect(request.headers).to.have.a.property("authorization");
        expect(request.headers.authorization).to.match(/^Bearer\s(\w*\.*)+$/);
      });
    });
  });
};
