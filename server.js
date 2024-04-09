const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME;
const configViewEngine = require("./src/config/viewEngine");
const webRoutes = require("./src/routers/web");
const apiRoutes = require("./src/routers/api");
const uploadTestRoutes = require("./src/routers/uploadTest");

configViewEngine(app);

app.use(express.json());

app.use("/", webRoutes);
app.use("/api", apiRoutes);
app.use("/abc", uploadTestRoutes);

app.listen(port, hostname, () => {
  console.log(`App running on http://${hostname}:${port}/`);
});
