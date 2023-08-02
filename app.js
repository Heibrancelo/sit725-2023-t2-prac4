let express = require("express");
let app = express();
let port = process.env.PORT || 3000;  // it should be PORT in uppercase

// Serve static files from the root directory
app.use(express.static(__dirname + '/'));

// Define route for the root
app.get("/", function (req, res) {
  res.sendFile('index.html', {root: __dirname });
});

// Define route for addition
app.get("/add", function (req, res) {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send("Invalid number(s) provided!");
    return;
  }

  let sum = num1 + num2;
  res.send(`The sum of ${num1} and ${num2} is ${sum}`);
});

// Start server
app.listen(port, function () {
  console.log("App is listening on port " + port);
});
