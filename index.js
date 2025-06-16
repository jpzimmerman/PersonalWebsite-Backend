import express from "express";
import { MongoClient } from "mongodb";

const port = process.env.port || 3000;

const app = express();
const mongoDbClient = new MongoClient("mongodb://localhost:27017");

let conn;
conn = await mongoDbClient.connect();

let db = conn.db("test");

app.use(express.json());

app.listen(port, () => {
  console.log("Personal website backend, listening on PORT:", port);
});

app.get("/", async (request, response) => {
  let collection = await db.collection("pwblog");
  let results = await collection.find({}).toArray();
  response.send(JSON.stringify(results));
});
