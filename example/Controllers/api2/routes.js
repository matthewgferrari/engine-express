const router = require("express").Router()
const controllers = require("./controllers")

router.get('/*', controllers.sendResponse)
module.exports = router