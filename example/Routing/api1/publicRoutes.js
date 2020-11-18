const publicRouter = require("express").Router()

publicRouter.get("/*",(req, res) => res.send("Public page: Hello World"))

module.exports = publicRouter