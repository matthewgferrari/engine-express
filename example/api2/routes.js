const router = require("express").Router()


router.get('/:name?', (req, res, next) => {
    res.send(`<div><h1>This is the API1 page ${req.params.name ? req.params.name : " Engine-Express user"}!</h1><p>If you add a name to the url parameter, the page will show the name!</p></div>`)
})

module.exports = router