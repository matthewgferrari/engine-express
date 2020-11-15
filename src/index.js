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
 * @param {api_list} array - List of application objects {routes_path: "?", basename:"/?"}.
 * @param {https} object - HTTPS credentials for HTTPS server {private_key_path: "?",certificate_path: "?"}
 */

const start = (port, api_list, https_creds = undefined) => {
  checkInputs(port, api_list);
  var router = express.Router()

  app.use("/", router);
  app.route("/*").get((req, res) => {
    res.status(404).send("<h2>Unknown Page</h2>")
  });

  if (!https_creds || !https_creds.certificate_path || !https_creds.private_key_path) {
    var httpServer = http.createServer(app);
    httpServer.listen(port, () => {
      console.log("listening on port " + port + " with an http server")
    });
  }
  else {
    var credentials = { key: fs.readFileSync(https_creds.private_key_path, 'utf8'), cert: fs.readFileSync(https_creds.certificate_path, 'utf8') };
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(port, () => {
      console.log("listening on port " + port + " with an https server")
    });
  }
  api_list.forEach(app => {
    try {
      if (app.basename[0] !== '/') {
        throw new Error("Basenames must begin with a '/'")
      }
      router.use(`${app.basename}`, require(`${app.routes_path}`));
    } catch (error) {
      console.log(`${colors.red("ERROR:")} Application ${colors.yellow(app.basename)} located at ${colors.green(app.routes_path)} encountered an error and will not be reachable. Please see below message for more info.\n`)
      console.log(error)
    }
  })
}
exports.start = start

/**
 * Access to the underlying express server.
 * @class underlying express server.
 */
exports.server = app


const checkInputs = (port, api_list) => {
  if (typeof port !== "number"){
    throw new Error("Port must be a number");
  }
  if (!Array.isArray(api_list)){
    throw new Error("Port must be a number");
  }
  for (var i = 0; i < api_list.length; i++){
    if (!api_list[i].basename){
      throw new Error("All APIs must have a basename");
    }
    if (!api_list[i].routes_path){
      throw new Error("All APIs must specify a path for the routes");
    }
  }
}