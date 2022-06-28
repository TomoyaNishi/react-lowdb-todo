import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const app = express(); // インスタンス化してexpressの機能を使えるように
const PORT = 8080;

// lowDB
import { Low as low, JSONFile as FileSync } from "lowdb";
const adapter = new FileSync("db.json");
const db = new low(adapter);
await db.read();

const posts = db.data.posts;
const users = db.data.users;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTION"
  );

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// TODO取得
app.get("/todos", (req, res) => {
  try {
    res.send(db.data.posts);
  } catch (err) {
    console.log(err);
  }
});

// TODO追加
app.post("/todos", async function (req, res) {
  try {
    const postsLength = posts.length;
    const id = postsLength !== 0 ? posts.slice(-1)[0].id + 1 : 0;
    const text = req.body.text;
    await posts.push({ id: id, text: text });
    db.write();
    res.send({});
    console.log(posts);
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
      post.id === id ? { id: post.id, text: text } : post
    );
    db.data.posts = newPosts;
    db.write();
    res.send({});
    console.log(posts);
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
    res.send({});
    console.log(posts);
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
    db.write();
    res.send(user);
    console.log(users);
  } catch (err) {
    console.log(err);
  }
});

// USER LOGIN
app.post("/auth/login", async function (req, res) {
  try {
    const user = users.find((user) => user.email === req.body.email);
    if (!user) return res.status(404).send("ユーザーが見つからない");

    //reqのpasswordとhash化したpasswordを照合
    const compared = await bcrypt.compare(req.body.password, user.password);
    if (!compared) return res.status(400).send("パスワードが正しくない");

    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log("サーバーを起動中"));
