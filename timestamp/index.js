// index.js
// where your node app starts

// init project
var express = require('express')
var app = express()
require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 }))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' })
})

app.get('/api/:date?', (req, res) => {
  // If date paramater is empty
  if (req.params.date === undefined) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString()
    })
  }

  // If date paramater is sent
  let inputDate = new Date(req.params.date)

  // Check for invalid date and parse
  if (inputDate.toString() === 'Invalid Date') {
    inputDate = new Date(+req.params.date)
  }
  // If date still invalid respond with error object
  if (inputDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' })
  }

  // Create dates object
  const resDates = {
    unix: inputDate.getTime(),
    utc: inputDate.toUTCString()
  }

  res.json(resDates)
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})