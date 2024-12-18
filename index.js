// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API endpoint to handle date conversion
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  
  let currentDate;
  
  // If no date provided, use current date
  if (!date) { 
    currentDate = new Date();
  } 
  // If date is a number (timestamp)
  else if (!isNaN(date)) {
    currentDate = new Date(parseInt(date)); 
  } 
  // If date is a valid string
  else {
    currentDate = new Date(date);
  }

  // Check if the date is valid
  if (isNaN(currentDate)) {
    return res.json({ error: "Invalid Date" });
  }

  // Send the response with Unix timestamp and UTC string
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
