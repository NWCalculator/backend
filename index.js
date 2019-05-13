const app = require("./app")();

app.listen(process.env.PORT, err => {
  if (err) {
    console.log("Encountered a problem on boot:" + err);
    process.exit(0);
  }
  console.log("Booting up the server on port:" + process.env.PORT);
});
