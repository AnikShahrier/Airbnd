const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const { default: mongoose } = require("mongoose");
const User = require("./models/User.js");
require("dotenv").config();
const app = express();
const secret = bcrypt.genSaltSync(10);

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173/",
  })
);

mongoose.connect(process.env.Mongoose_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, secret),
  });
  res.json(user);
});

app.listen(4000);
