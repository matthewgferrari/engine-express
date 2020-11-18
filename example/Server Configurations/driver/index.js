const engine = require("engine-express")
const fs = require("fs")
const path = require("path")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const fileUpload= require("express-fileupload")

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
engine.server.use(bodyParser.json())
engine.server.use(cors())
engine.server.use(fileUpload())
engine.server.use(morgan('combined', { stream: fs.createWriteStream(path.join(__dirname, '../engine-express.log'), { flags: 'a' }) }))

engine.start(5000, api_list);