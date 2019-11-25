const { expect } = require("chai");

module.exports = function(app) {
  describe("TEST #items routes", function() {
    describe("GET /apprel", function() {
      it("should return an array of json", async function() {
        let result = null,
          request = null;
        try {
          request = await app.inject({
            method: "GET",
            url: "/v1/apparel"
          });
          result = JSON.parse(request.payload);
        } catch (err) {
          throw new Error(err);
        }

        expect(request.statusCode).to.equal(200);
        expect(result.apparel.results).to.be.an("array");
        expect(result.apparel.results).to.have.lengthOf(20);
        expect(result.apparel.total).to.be.above(1);
      });
    });

    it("should return a list of up to 100 records", async function() {
      let result = null,
        request = null;

      try {
        request = await app.inject({
          method: "GET",
          url: "/v1/apparel",
          query: { limit: 100 }
        });
        result = JSON.parse(request.payload);
      } catch (err) {
        throw new Error(err);
      }

      expect(request.statusCode).to.equal(200);
      expect(result.apparel.results).to.be.an("array");
      expect(result.apparel.results).to.have.lengthOf(100);
    });

    it("should return only records of tier 5", async function() {
      let result = null,
        request = null;

      try {
        request = await app.inject({
          method: "GET",
          url: "/v1/apparel",
          query: { tier: 5 }
        });
        result = JSON.parse(request.payload);
      } catch (err) {
        throw new Error(err);
      }

      const results = result.apparel.results.filter(({ tier }) => tier === 5);

      expect(request.statusCode).to.equal(200);
      expect(results).to.have.lengthOf(20);
      expect(result.apparel.total).to.be.above(1);
    });
  });
};
