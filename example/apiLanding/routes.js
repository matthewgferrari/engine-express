const router = require("express").Router()


router.get('/', (req, res, next) => {
    res.send("<div><h1>This is the API landing page!</h1><p>Welcome to the landing page for Engine-Express</p></div>")
})

module.exports = router