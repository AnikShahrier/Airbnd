const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const { default: mongoose } = require("mongoose");
const User = require("./models/User.js");
require("dotenv").config();

const secret = bcrypt.genSaltSync(10);
const jwtSecret = "asfsatwt5498ferewgfwv64s6d14gsd";

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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
      jwt.sign(
        { email: user.email, id: user._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    } else {
      res.status(422).json("Pass not okay");
    }
  } else {
    res.json("not found");
  }
});

app.listen(3000);
