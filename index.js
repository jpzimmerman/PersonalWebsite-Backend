import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const port = process.env.port || 2727;

const app = express();
const mongoDbClient = new MongoClient("mongodb://localhost:27017");

app.use(cors());

let conn;
conn = await mongoDbClient.connect();

let db = conn.db("test");

app.use(express.json());

app.listen(port, () => {
  console.log("Personal website backend, listening on PORT:", port);
});

app.get("/getBlogPosts", async (request, response) => {
  let collection = await db.collection("pwblog");
  let results = await collection.find({}).toArray();
  response.send(JSON.stringify(results));
});
