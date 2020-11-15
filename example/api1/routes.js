const router = require("express").Router()

router.get('/', (req, res, next) => {
    res.send("<div><h1>This is the API1 page!</h1><p>Feel free to go to <a href = 'route1'>route 1</a> or <a href = 'route2'>route 2</a></p></div>")
})

router.get('/route1', (req, res, next) => {
    res.send("<h1>This is route 1 of the API1 page!</h1>")
})

router.get('/route2', (req, res, next) => {
    res.send("<h1>This is route 2 of the API1 page!</h1>")
})

router.get('/*', (req, res, next) => {
    res.send("<h1>The page you entered does not exist!</h1>")
})


module.exports = router