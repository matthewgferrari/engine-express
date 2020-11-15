<h1 align="center">Engine-Express</h1>

<div align="center">

A lightweight [Express](https://expressjs.com/) wrapper that enables multiple APIs to be served from a single server given just the directory path and domain basename.

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/matthewgferrari/engine-express/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/express-engine)](https://www.npmjs.com/package/express-engine)
</div>

## Installation
Engine-Express is available as an [npm package](https://www.npmjs.com/package/engine-express).

```sh
// with npm
npm install engine-express
```
## Quick Start
```sh
const engine = require("engine-express")

var api_list = [
	{
		"routes_path":  PATH_TO_ROUTES,
		"basename":  "/api1"
	},
	{
		"routes_path":  PATH_TO_ROUTES,
		"basename":  "/api2"
	},
]

engine.start(5000, api_list);
```

**Documentation**
Check out the documentation [here](https://github.com/matthewgferrari/engine-express/blob/main/docs).

**Sample Project**
Check out a sample project [here](https://github.com/matthewgferrari/engine-express/blob/main/example).

## API
Name | Type | Description
-----|------|---------
start| function| `start` starts the server and serves the APIs. Learn more about the start function <a href = "/documentation">here</a>.
server| property| `server` property provides direct access to the underlying server. Learn more about the server property <a href = "/documentation">here</a>.

## Examples
### Example with HTTPS
```sh
const engine = require("engine-express")
const path = require("path")

var api_list = [
	{
		"routes_path":  PATH_TO_ROUTES,
		"basename":  "/api1"
	},
	{
		"routes_path":  PATH_TO_ROUTES,
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
		"routes_path":  path.join(__dirname, RELATIVE_PATH_TO_ROUTES),
		"basename":  "/api1"
	},
	{
		"routes_path":  PATH_TO_ROUTES,
		"basename":  "/api2"
	},
]

engine.start(5000, api_list);
```
### Example with morgan, body-parser, and cors
```sh
const engine = require("engine-express")
const fs = require("fs")
const path = require("path")
const bodyParser = require("bodyParser")
const cors = require("cors")
const morgan = require("morgan")

var api_list = [
	{
		"routes_path":  PATH_TO_ROUTES,
		"basename":  "/api1"
	},
	{
		"routes_path":  PATH_TO_ROUTES,
		"basename":  "/api2"
	},
]
engine.server.use(bodyParser.json())
engine.server.use(cors())
engine.server.use(morgan('combined', { stream: fs.createWriteStream(path.join(__dirname, '../engine-express.log'), { flags: 'a' }) }))

engine.start(5000, api_list);
```