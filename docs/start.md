<h1 align="center">Engine-Express Start Function</h1>

## Paramaters
|  Name|Required/Optional|
|--|--|
| port |required
| api_list |required
| https_credentials|optional


## Index

|  Name| Type |Description|Example|
|--|--|--|--|
| port |int |The port number the server will be listening on| 5000
| api_list|array of api objects|APIs to be served by engine-express| `[api1, api2]`
| api object|object|Object with properties `routes_path` and `basename`| `{routes_path, basename}`
| routes_path|string/file path|Path to file with routes for desired API. For relative path, use the path module or follow the relative path example| `/home/routes.js`
| basename|string|Basename of domain that API should be reachable at | `/api1`
| https_credentials|object|Object with properties `certificate_path` and `private_key_path`| `{certificate_path, private_key_path}`
| certificate_path|string/file path|File path of HTTPS certificate| `/home/server.cer`
| private_key_path|string/file path|File path of HTTPS private key| `/home/server.key`

## Example
### Without HTTPS
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
```
### With HTTPS
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