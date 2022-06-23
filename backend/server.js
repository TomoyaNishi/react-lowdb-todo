import express from "express";
const app = express(); // インスタンス化してexpressの機能を使えるように
const PORT = 8080;

// lowDB
import { Low as low, JSONFile as FileSync } from "lowdb";
const adapter = new FileSync("db.json");
const db = new low(adapter);
await db.read();

const posts = db.data.posts;

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

app.get("/todos", (req, res) => {
  try {
    res.send(db.data.posts);
  } catch (err) {
    console.log(err);
  }
});

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

app.listen(PORT, () => console.log("サーバーを起動中"));
