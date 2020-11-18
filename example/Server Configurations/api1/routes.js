const  router = require("express").Router()

router.route("/route").get((req, res) => res.send("Hello World! This is a route"))
router.get('/*', (req, res) => res.send("Hello World! This is API 1"))

module.exports = router