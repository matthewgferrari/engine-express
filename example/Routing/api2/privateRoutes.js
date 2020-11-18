const privateRouter = require("express").Router()

privateRouter.get("/*",(req, res) => res.send("Private page: Hello World"))

module.exports = privateRouter