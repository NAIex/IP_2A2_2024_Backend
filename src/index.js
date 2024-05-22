import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";

import swaggerUi from "swagger-ui-express";
import specs from "./api/utils/swagger.js";

import User from "./api/routes/User.js";
import UserAuth from "./api/routes/Auth.js";
import WordBlacklist from "./api/routes/WordBlacklist.js";
import Thread from "./api/routes/Thread.js";
import Tag from "./api/routes/Tags.js"
import Community from "./api/routes/Community.js";
import BannedUsers from "./api/routes/BannedUsers.js";
import MutedUsers from './api/routes/MutedUsers.js';

const app = express();
const port = 4000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", User);
app.use("/", WordBlacklist);
app.use("/community", Community);
app.use("/thread", Thread);
app.use("/auth", UserAuth);
app.use("/tag", Tag);
app.use("/ban", BannedUsers);
app.use('/mute', MutedUsers);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
