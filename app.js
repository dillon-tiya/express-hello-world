const express = require('express')
const path = require("path");
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post('/', (request, response) => {
  const url = request.url;
  const token = extractTokenFromURL(url);

  sendPostRequestWithToken(token, (error, result) => {
    if (error) {
      return response.status(500).send(error)
    }
    response.send(result)
  })
})

function extractTokenFromURL(url) {
  const base64Token = url.split('#')[1]
  const token = Buffer.from(base64Token, 'base64').toString()
  console.log(token)
  return token
}

function sendPostRequestWithToken(token, callback) {
  callback(null, 'Success!')
}

/**  app.listen(3000, () => {
  console.log('Funchat app listening on port 3000')
}) */

// #############################################################################
// Logs all request paths and method
app.use(function (req, res, next) {
  res.set('x-timestamp', Date.now())
  res.set('x-powered-by', 'cyclic.sh')
  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
app.use(express.static('public', options))

// #############################################################################
// Catch all handler for all other request.
app.use('*', (req,res) => {
  res.json({
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
      params: req.params
    })
    .end()
})

module.exports = app
