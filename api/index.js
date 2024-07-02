const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const { default: mongoose } = require("mongoose");
const User = require("./models/User.js");
require("dotenv").config();

const secret = bcrypt.genSaltSync(10);

app.use(express.json());

mongoose.connect(process.env.Mongoose_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, secret),
    });
    res.json(user);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email });
  if (user) {
    res.json("found");
  } else {
    res.json("not found");
  }
});

app.listen(3000);
