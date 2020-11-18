const engine = require("engine-express")
const path = require("path")

//Install dependencies in the driver and both APIs
//Run driver with `$ node index.js` command
//Navigate to any of the following routes:
//	localhost:5000/api1
//	localhost:5000/api1/route
//	localhost:5000/api2
//	localhost:5000/api2/route

var api_list = [
	{
		"routes_path":  path.join(__dirname,"../api1/routes.js"),
		"basename":  "/api1"
	},
	{
		"routes_path":  path.join(__dirname, "../api2/routes.js"),
		"basename":  "/api2"
	},
]

engine.start(5000, api_list);