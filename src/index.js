import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 4000;

import User from './api/routes/User.js';
import UserAuth from './api/routes/Auth.js';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/user', User);
app.use('/', UserAuth);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})