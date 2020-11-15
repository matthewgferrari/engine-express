const cors = require('cors');
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const colors = require("colors")  

var app = express();

/**
 * Starts and manages all express api routers.
 * @function start engine-express.
 * @param {port} int - the port number.
 * @param {applications} array - List of application objects {path: "?", basename:"/?"}.
 * @param {https} object - HTTPS credentials for HTTPS server {PRIVATE_KEY_PATH: "?",CERTIFICATE_PATH: "?"}
 */

const start = (port, applications, https_creds = undefined) => {
  var router = express.Router()

  app.options('*', cors())
  app.use(express.json());
  app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "exposedHeaders": ["content-disposition"]
  }))
  app.use("/", router);
  app.route("/*").get((req, res) => {
    res.status(404).send("<h2>Unknown Page</h2>")
  });

  if (!https_creds || !https_creds.CERTIFICATE_PATH || !https_creds.PRIVATE_KEY_PATH) {
    var httpServer = http.createServer(app);
    httpServer.listen(port, () => {
      console.log("listening on port " + port + " with an http server")
    });
  }
  else {
    var credentials = { key: fs.readFileSync(https_creds.PRIVATE_KEY_PATH, 'utf8'), cert: fs.readFileSync(https_creds.CERTIFICATE_PATH, 'utf8') };
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(port, () => {
      console.log("listening on port " + port + " with an https server")
    });
  }
  applications.forEach(app => {
    try {
      if (app.basename[0] !== '/') {
        throw new Error("Basenames must begin with a '/'")
      }
      router.use(`${app.basename}`, require(`${app.path}`));
    } catch (error) {
      console.log(`${"ERROR:".red} Application ${app.basename.yellow} located at ${app.path.green} encountered an error and will not be reachable. Please see below message for more info.\n`)
      console.log(error)
    }
  })
}
exports.start = start
exports.use = (handlers) => app.use(handlers)
