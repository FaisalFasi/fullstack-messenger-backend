import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
const app = express();

// database
const messages = [];

//  to make public folder available for everyone
app.use(express.static("public"));

//  cross origin resources sharing
app.use(cors());

// check if my request have a body type json
app.use(express.json());

app.get("/messages", (req, res) => res.json(messages));

app.post("/messages", (req, res) => {
  if (!req.body.username || !req.body.content) {
    //  400 is a bad request error
    res.status(400).send("username and content are required");
  } else {
    const newDocument = { ...req.body, id: uuidv4(), created_at: Date.now() };
    messages.push(newDocument);
    res.status(201).json(newDocument);
  }
});

app.put("/messages/:id", (req, res) => {
  const id = req.params.id;
  const indexOfId = messages.findIndex((message) => message.id == id);
  messages[indexOfId].content = req.body.content;
  res.status(200).json(messages[indexOfId]);
});

app.delete("/messages/:id", (req, res) => {
  const { id } = req.params;
  const indexOfId = messages.findIndex((message) => message.id == id);
  messages.splice(indexOfId, 1);
  res.status(204).send("message deleted");
});

app.listen(process.env.PORT, () =>
  console.log("Server is running  on port :" + process.env.PORT)
);
