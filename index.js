import messages from "./db.js";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
const app = express();

app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => res.json("Hello World"));

app.get("/messages", (req, res) => res.json(messages));

app.listen(process.env.PORT, () =>
  console.log("Server is running  on port :" + process.env.PORT)
);
