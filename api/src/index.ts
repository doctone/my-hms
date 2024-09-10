import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.get("/ping", (_req, res) => {
  res.send("pong");
});
app.post("/tasks", (req, res) => {
  return res.json({ task: req.body }).send();
});

app.listen(port, () => {
  console.log(`Server is running on ${process.env.HOST}:${port}`);
});
