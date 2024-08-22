const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

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
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

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

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userInfo.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
    timeout: 60000,
  });
  res.json(newName);
});

const photosMiddleWare = multer({ dest: "uploads/" });

app.post("/upload", photosMiddleWare.array("photos", 100), (req, res) => {
  const uploadedFiles = [];

  try {
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;

      // Renaming the file to include the correct extension
      fs.renameSync(path, newPath);

      // Replace backslashes with forward slashes for consistency
      const formattedPath = newPath.replace(/\\/g, "/");
      uploadedFiles.push(formattedPath.replace("uploads/", ""));
    }

    // Responding with the list of uploaded files
    res.json(uploadedFiles);
  } catch (err) {
    console.error("Error during file upload:", err);
    res.status(500).json({ error: "File upload failed" });
  }
});

app.listen(3000);
