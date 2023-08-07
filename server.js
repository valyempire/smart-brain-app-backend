import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import knex from "knex";
import register from "./controllers/register.js";
import signin from "./controllers/signin.js";
import profile from "./controllers/profile.js";
import image from "./controllers/image.js";
import clarifai from "./controllers/clarifai.js";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "password",
    database: "postgres",
  },
});

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.redirect("https://vali-smartbrain.netlify.app/" + req.path);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/clarifai", (req, res) => {
  clarifai.handleApiCall(req, res);
});

app.listen(3001, () => {
  console.log("app is running on port 3001");
});
