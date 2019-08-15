const sanitizeHtml = require("sanitize-html");
const fp = require("fastify-plugin");

const recursiveSanitize = (obj, opts) => {
  let res;
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === "object" && !Array.isArray(val)) {
      res[key] = recursiveSanitize(val, opts);
    } else if (val && typeof val === "string") {
      res[key] = recursiveSanitize(val, opts);
    } else {
      res[key] = val;
    }
  });

  return res;
};

const sanitize = opts => {
  opts.allowedTags = opts.allowedTags || [];
  opts.allowedIframeHostnames = opts.allowedIframeHostnames || [];
  opts.allowedAttributes = opts.allowedAttributes || {};
  opts.allowedClases = opts.allowedClases || {};

  return function(req, reply, next) {
    let request = req.body || req.query;
    request = recursiveSanitize(request, opts);
    next();
  };
};

const setup = (app, opts, next) => {
  try {
    app.decorate("sanitize", sanitize);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = fp(setup);
