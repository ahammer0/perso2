const next = require("next");
require("dotenv").config();
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const port = process.env.PORT || 4000; // Port par défaut

const handle = app.getRequestHandler();

app.prepare().then(() => {
  require("http")
    .createServer((req, res) => {
      handle(req, res);
    })
    .listen(port, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:" + port);
    });
});
