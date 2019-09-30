"use strict";
const fp = require("fastify-plugin");
const nodemailer = require("nodemailer");

const { createTransport } = nodemailer;

const defaultTestEmailConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false
};

async function sendMockMail(to, from, subject, text, html, opts) {
  try {
    const testAccount = await nodemailer.createTestAccount();
    defaultTestEmailConfig.auth.user = testAccount.user;
    defaultTestEmailConfig.auth.pass = testAccount.pass;
    const config = Object.assign({}, opts, defaultTestEmailConfig);
    const message = await sendMail(to, from, subject, text, html, config);
    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  } catch (err) {
    return Promise.reject(err);
  }
}

async function sendMail(to, from, subject, text, html, opts) {
  try {
    const transport = createTransport(opts);
    await transport.sendMail({ to, from, subject, text, html });
  } catch (err) {
    return Promise.reject(err);
  }
}

function setup(fastify, opts, next) {
  fastify
    .decorate("mail", { sendMail, sendMockMail })
    .addHook("close", (fastify, done) => fastify.mail.close(done));

  next();
}

module.exports = fp(setup);
