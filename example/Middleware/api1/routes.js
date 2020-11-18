const router = require("express").Router()

const log = (req, res, next) => {
	console.log("Request recieved")
	next()
}

const authenticate = (req, res, next) => {
	if (Math.random() > .5){
		console.log(`${req.params.name ? req.params.name : "An unamed user"} had improper credentials`)
		res.send("Access denied");
	}
	else{
		console.log(`${req.params.name ? req.params.name : "An unamed user"} had proper credentials`)
		next()
	}
}

const respond = (req, res) => res.send(`${req.params.name ? req.params.name : "An unamed user"} says 'Hello World!'`)

router.get('/:name?', log, authenticate, respond)

module.exports = router