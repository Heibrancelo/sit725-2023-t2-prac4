let express = require("express");
let app = express();
let port = process.env.port || 3000;
let collection;

const { MongoClient, ServerApiVersion, Collection } = require("mongodb");
const uri =
  "mongodb+srv://admin:admin@cluster0.waugomm.mongodb.net/?retryWrites=true&w=majority";

app.use(express.static(__dirname + "/"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//Run MONGO DB

async function runDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const dbName = "Cluster0";
    await client.db(dbName).command({ ping: 1 });
  
    collection = client.db().collection("Projects");
    console.log (collection)
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (ex) {
    console.error("Error connecting to MongoDB:", ex);
  }
}


const cardList = [
  {
    title: "Kitten 2",
    image: "./images/kitten-2.jpg",
    link: "About Kitten 2",
    desciption: "Demo desciption about kitten 2",
  },
  {
    title: "Kitten 3",
    image: "./images/kitten-3.jpg",
    link: "About Kitten 3",
    desciption: "Demo desciption about kitten 3",
  },
];

// APIs
app.get("/api/project", (req, res) => {
  getAllProjects((err, result) => {
    console.log(result);
    if (!err) {
      res.json({ statusCode: 200, data: result, message: "success" });
    }
  });
});



function insertProject(project, callback) {
  if (!collection) {
      return callback(new Error("Database not initialized"));
  }
  collection.insertOne(project, callback);
}

function getAllProjects(callback) {
  if (!collection) {
      return callback(new Error("Database not initialized"));
  }
  collection.find({}).toArray(callback);
}


app.post("/api/project", (req, res) => {
  let project = req.body;
  console.log(project);
  insertProject(project, (err, result) => {
    if (!err) {
      res.json({ statusCode: 201, data: result, message: "success" });
    }
  });
});


app.listen(port, () => {
  console.log("App listening to: " + port);
  runDB().catch(console.dir);
});
