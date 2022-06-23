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
  res.send(db.data.posts);
});

app.post("/todos", async function (req, res) {
  try {
    const id = posts.slice(-1)[0].id + 1;
    const text = req.body.text;
    await posts.push({ id: id, text: text });
    db.write();
    res.send({});
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log("サーバーを起動中"));
