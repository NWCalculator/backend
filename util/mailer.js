"use strict";
const fp = require("fastify-plugin");
const nodemailer = require("nodemailer");

const { createTransport } = nodemailer;

async function sendMockMail(to, from, subject, text, html, opts) {
  try {
    const testAccount = await nodemailer.createTestAccount();
    // const config = {
    //   ...testAccount.smtp,
    //   auth: {
    //     user: testAccount.user,
    //     pass: testAccount.pass
    //   }
    // };
    const config = {
      ...testAccount.smtp,
      auth: {
        user: process.env.TEST_EMAIL_USER,
        pass: process.env.TEST_EMAIL_PASS
      }
    };
    const message = await sendMail(to, from, subject, text, html, config);
    // console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

async function sendMail(to, from, subject, text, html, opts) {
  try {
    const transport = createTransport(opts);
    await transport.sendMail({ to, from, subject, text, html });
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

function setup(fastify, opts, next) {
  fastify
    .decorate("mail", { sendMail, sendMockMail })
    .addHook("onClose", (fastify, done) => fastify.mail.close(done));

  next();
}

module.exports = fp(setup);
