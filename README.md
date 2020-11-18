<h1 align="center">Engine-Express</h1>

<div align="center">

A lightweight [Express](https://expressjs.com/) wrapper that enables multiple APIs to be served from a single server given just the directory path and domain basename.

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/matthewgferrari/engine-express/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/engine-express)](https://www.npmjs.com/package/express-engine)
[![npm size](https://img.shields.io/bundlephobia/min/engine-express)](https://github.com/matthewgferrari/engine-express/blob/main/src)

</div>

## Installation
Engine-Express is available as an [npm package](https://www.npmjs.com/package/engine-express).
```sh
// with npm
npm install engine-express
```
## Quick Start
`./index.js`
```sh
const engine = require("engine-express")

var api_list = [
	{
		"routes_path":  PATH_TO_API1_ROUTES_FILE,
		"basename":  "/api1"
	},
	{
		"routes_path":  PATH_TO_API2_ROUTES_FILE,
		"basename":  "/api2"
	},
]

engine.start(5000, api_list);
```

`API1_ROUTES_FILE.js` and `API2_ROUTES_FILE.js`
```sh
const  router = require("express").Router()

router.get('/route1', (req, res) => res.send("Hello World! This is route 1"))
router.routes("/route2").get((req, res) => res.send("Hello World! This is route 2"))

module.exports = router
```
   
**Documentation:** Check out the documentation [here](https://github.com/matthewgferrari/engine-express/blob/main/docs).

**Example Projects:** All examples in this document can be found fully implemented [here](https://github.com/matthewgferrari/engine-express/blob/main/example).

**Overview:** Engine-Express enables a node server to serve multiple Express APIs from the same port.  If you want to configure the underlying server before listening, simply access `engine.server` to make modifications to the underlying express application. To use the tool and start the server, simply pass the configuration parameters to the start function. Besides the port number and the optional HTTPS credentials, the start function will also take an array of APIs in the format of a basename and path. The basename represents the subdomain of the server where the API should be accessible, and the path represents the location of the routes that make up the API.

The specified routes file should export a Router, as well as define as act as the head of the routes. It is possible to both exhaustively define all routes in this file, as well as simply defining routes that filter to subsequent routes in other files. Both of these cases are demonstrated below in the Routes File Examples section.
## API
Name | Type | Description
-----|------|---------
start| function| `start` starts the server and serves the APIs. Learn more about the start function [here](https://github.com/matthewgferrari/engine-express/blob/main/docs).
server| property| `server` property provides direct access to the underlying server. Learn more about the server property [here](https://github.com/matthewgferrari/engine-express/blob/main/docs).

## Index File Examples
### Example with HTTPS
```sh
const engine = require("engine-express")
const path = require("path")

var api_list = [
	{
		"routes_path":  PATH_TO_ROUTES_FILE,
		"basename":  "/api1"
	},
	{
		"routes_path":  PATH_TO_ROUTES_FILE,
		"basename":  "/api2"
	},
]

var https_creds = {
    "certificate_path": PATH_TO_HTTPS_CERTIFICATE,
    "private_key_path": PATH_TO_HTTPS_PRIVATE_KEY
}

engine.start(5000, api_list, https_creds);
```
### Example with relative file paths
```sh
const engine = require("engine-express")
const path = require("path")

var api_list = [
	{
		"routes_path":  path.join(__dirname, RELATIVE_PATH_TO_ROUTES_FILE),
		"basename":  "/api1"
	},
	{
		"routes_path":  PATH_TO_ROUTES_FILE,
		"basename":  "/api2"
	},
]

engine.start(5000, api_list);
```
### Example with server configurations
```sh
const engine = require("engine-express")
const fs = require("fs")
const path = require("path")
const bodyParser = require("bodyParser")
const cors = require("cors")
const morgan = require("morgan")
const fileUpload= require("express-fileupload")

var api_list = [
	{
		"routes_path":  PATH_TO_ROUTES_FILE,
		"basename":  "/api1"
	},
	{
		"routes_path":  PATH_TO_ROUTES_FILE,
		"basename":  "/api2"
	},
]
engine.server.use(bodyParser.json())
engine.server.use(cors())
engine.server.use(fileUpload())
engine.server.use(morgan('combined', { stream: fs.createWriteStream(path.join(__dirname, '../engine-express.log'), { flags: 'a' }) }))

engine.start(5000, api_list);
```
## Routes File Examples
### Example with controllers

`ROUTES_FILE.js`
```sh
const router = require("express").Router()
const controllers = require("./controllers")

router.get('/route1', controllers.sendResponse)
module.exports = router
```

`./controllers.js`
```sh
exports.sendResponse = (req, res) => res.send("Hello World")
```
### Example with routing

`ROUTES_FILE.js`
```sh
const router = require("express").Router()

router.use('/public', require("./publicRoutes"))
router.routes('/private', require("./privateRoutes"))

module.exports = router
```
`./publicRoutes`
```sh
const publicRouter = require("express").Router()

publicRouter.get("/*",(req, res) => res.send("Hello World"))

module.exports = publicRouter
```
`./privateRoutes`
```sh
const privateRouter = require("express").Router()

privateRouter.get("/*",(req, res) => res.send("Hello World"))

module.exports = privateRouter
```
### Example with middleware
`ROUTES_FILE.js`
```sh
const router = require("express").Router()

router.post('/route1/:name?', log, authenticate, respond)

const log = (req, res, next) => {
	console.log("Request recieved")
	next()
}

const authenticate = (req, res, next) => {
	if (Math.random() > .5){
		console.log("${req.params.name} had Improper credentials")
		res.send("Access denied");
	}
	else{
		console.log("${req.params.name} had proper credentials")
		next()
	}
}

const respond = (req, res) => res.send("Hello World")
module.exports = router
```