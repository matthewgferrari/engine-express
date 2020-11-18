const router = require("express").Router()

router.use('/public', require("./publicRoutes"))
router.use('/private', require("./privateRoutes"))

module.exports = router