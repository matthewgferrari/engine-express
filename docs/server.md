<h1 align="center">Engine-Express Server Property</h1>

## Description
The server property of the engine-express module provides access to the underlying express server. From this property, it is possible to setup extensions for the server, add middleware to specific requests, and more! For an exhaustive list of all the possibilities of an express server, visit the express documentation [here](https://expressjs.com/en/api.html#app.properties).

## Example
```sh
const engine = require("engine-express")

var api_list = [
	{
		"routes_path": PATH_TO_ROUTES,
		"basename": "/api1"
	}
]

console.log(engine.server)
engine.start(5000, api_list)