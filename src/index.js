import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 4000;

import User from "./api/routes/User.js";
import Community from "./api/routes/Community.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", User);
app.use("/community", Community);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
