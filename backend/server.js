import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";
import bcrypt from "bcrypt";
const app = express();
const PORT = 8080;
dotenv.config();
const JWS_SECRET_KEY = process.env.JWT_SECRET;

// lowDB
import { Low as low, JSONFile as FileSync } from "lowdb";
const adapter = new FileSync("db.json");
const db = new low(adapter);
await db.read();

const posts = db.data.posts;
const users = db.data.users;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTION"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

function tokenMatch(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.json({ error: "header error" });

  const token = jwt.verify(authHeader, JWS_SECRET_KEY).id;
  return token;
}

// TODO取得
app.get("/todos", async (req, res) => {
  try {
    const token = tokenMatch(req, res);
    const userPosts = posts.filter((post) => post.uid === token);

    res.json(userPosts);
  } catch (err) {
    console.log(err);
  }
});

// TODO追加
app.post("/todos", async function (req, res) {
  try {
    const token = tokenMatch(req, res);
    const postsLength = posts.length;
    const id = postsLength !== 0 ? posts.slice(-1)[0].id + 1 : 0;
    const text = req.body.text;
    await posts.push({ id: id, uid: token, text: text });
    db.write();
    res.json({});
  } catch (err) {
    console.error(err);
  }
});

// TODO編集
app.put("/todos", async function (req, res) {
  try {
    const id = req.body.id;
    const text = req.body.text;
    const newPosts = posts.map((post) =>
      post.id === id ? { ...post, text: text } : post
    );
    db.data.posts = newPosts;
    db.write();
    res.json({});
  } catch (err) {
    console.log(err);
  }
});

// TODO削除
app.delete("/todos", async function (req, res) {
  try {
    const id = req.body.id;
    const newPosts = posts.filter((post) => post.id !== id);
    db.data.posts = newPosts;
    db.write();
    res.json({});
  } catch (err) {
    console.log(err);
  }
});

// USER SIGNUP
app.post("/auth/register", async function (req, res) {
  try {
    const usersLength = users.length;
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //reqのpasswordをhash化
    const user = {
      id: usersLength !== 0 ? users.slice(-1)[0].id + 1 : 0,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    users.push(user);

    const token = jwt.sign(req.body.email, JWS_SECRET_KEY);
    res.cookie("token", token, { httpOnly: true });

    db.write();
    res.json({ name: user.name, token });
  } catch (err) {
    console.log(err);
  }
});

// USER LOGIN
app.post("/auth/login", async function (req, res) {
  try {
    const user = users.find((user) => user.email === req.body.email);
    if (!user) return res.status(404).json("ユーザーが見つからない");

    //reqのpasswordとhash化したpasswordを照合
    const compared = await bcrypt.compare(req.body.password, user.password);
    if (!compared) return res.status(400).json("パスワードが正しくない");

    const token = jwt.sign({ id: user.id }, JWS_SECRET_KEY, {
      expiresIn: "1800s",
    });

    res.json({ name: user.name, token });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log("サーバーを起動中"));
