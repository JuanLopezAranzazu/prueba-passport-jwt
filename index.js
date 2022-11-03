const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
require("./utils/auth/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { checkApiKey } = require("./middlewares/auth.handler");
app.get("/apiKey", checkApiKey, (req, res) => {
  res.json({ message: "hola mundo" });
});

const routes = require("./routes/index.js");
routes(app);

const {
  errorHandler,
  boomErrorHandler,
  logErrors,
} = require("./middlewares/error.handler");
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const { config } = require("./config/config");
const port = config.port;
app.listen(port, () => console.log(`Server running in port ${port}`));
