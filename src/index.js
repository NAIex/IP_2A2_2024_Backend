import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";

import swaggerUi from 'swagger-ui-express';
import specs from "./api/utils/swagger.js";

import User from "./api/routes/User.js";
import Community from "./api/routes/Community.js";
const app = express();
const port = 4000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
import UserAuth from './api/routes/Auth.js';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", User);
app.use("/community", Community);
app.use('/', UserAuth);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});