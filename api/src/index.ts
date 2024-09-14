import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();

const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI ?? "", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: String,
  status: { type: String, default: "pending" },
});

const Task = mongoose.model("Task", taskSchema);

app.use(cors());
app.use(bodyParser.json());
app.get("/ping", (_req, res) => {
  res.send("pong");
});
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  return res.json({ task: req.body }).send();
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  return res.json({ data: tasks }).send();
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
