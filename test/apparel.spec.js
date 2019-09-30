const buildFastify = require("../app");
const tap = require("tap").test;

require("dotenv").config();

tap("GET `/apparel` route", t => {
  t.plan(4);
  const app = buildFastify();

  t.tearDown(() => app.close());

  app.inject(
    {
      method: "GET",
      url: "/v1/apparel"
    },
    (err, res) => {
      t.error(err);

      console.log(res.payload);

      t.strictEqual(res.statusCode, 200);
      t.type(res.payload.apparel.results, "array");
      t.type(res.payload.apparel.total, "integer");
      t.end();
    }
  );
});
