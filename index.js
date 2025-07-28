import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

const port = process.env.port || 2727;

const app = express();
const mongoDbClient = new MongoClient("mongodb://localhost:27017");
const pwblogCollection = "pwblog";

const corsOptions = {
  origin: "*", // Replace with your frontend domain
  methods: "*",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Origin",
    "Content-Type",
    "Authorization",
  ],
};

app.use(cors(corsOptions));

let conn;
conn = await mongoDbClient.connect();

let db = conn.db("test");

app.use(express.json());

app.listen(port, () => {
  console.log("Personal website backend, listening on PORT:", port);
});

app.options("/blogPosts/:postId/addLike", cors(corsOptions));

app.get("/getBlogPosts", async (request, response) => {
  let collection = await db.collection(pwblogCollection);
  let results = await collection.find({}).toArray();
  response.send(JSON.stringify(results));
});

app.patch("/blogPosts/:postId/addLike", async (request, response) => {
  let postId = request.params.postId;
  let collection = await db.collection(pwblogCollection);
  console.log(postId);
  let results = await collection.updateOne(
    { _id: new ObjectId(postId) },
    { $inc: { numberOfLikes: 1 } }
  );
  response.send(JSON.stringify(results));
});
