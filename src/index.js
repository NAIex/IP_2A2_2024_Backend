import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import swaggerUi from "swagger-ui-express";
import specs from "./api/utils/swagger.js";

import User from "./api/routes/User.js";
import AdminTag from "./api/routes/AdminTagRequests.js";
import UserAuth from './api/routes/Auth.js';
import WordBlacklist from './api/routes/WordBlacklist.js';
import Thread from "./api/routes/Thread.js";
import Tag from "./api/routes/Tags.js"
import Community from "./api/routes/Community.js";

import BannedUsers from "./api/routes/BannedUsers.js";
import MutedUsers from "./api/routes/MutedUsers.js";

import Comment from "./api/routes/Comment.js";
import Feed from "./api/routes/Feed.js";

import Chat from "./api/routes/Chat.js";

import chatSocket from "./api/controllers/newChat.js";
import { setupCleanupTask } from "./api/utils/chat.js";

const app = express();
const port = 4000;



const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);



app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



chatSocket(io);

setupCleanupTask();



app.use("/user", User);
app.use("/adminTag", AdminTag);
app.use("/blacklist", WordBlacklist);
app.use("/community", Community);
app.use("/thread", Thread);

app.use("/", UserAuth);
app.use("/tag", Tag);

app.use("/ban", BannedUsers);
app.use("/mute", MutedUsers);

app.use("/comment", Comment);
app.use("/feed", Feed);

app.use("/chat", Chat);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});