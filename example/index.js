const engine = require("engine-express")

engine.start(5000, [
    {
        "routes_path": path.join(__dirname, "apiLanding/routes"),
        "basename": "/"
    },
    {
        "routes_path": path.join(__dirname, "api1/routes"),
        "basename": "/api1"
    },
    {
        "routes_path": path.join(__dirname, "api2/routes"),
        "basename": "/api2"
    }
])
