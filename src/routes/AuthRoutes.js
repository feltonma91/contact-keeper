const express = require('express')
const router = express.Router()

// @route 	Get api/auth
// @desc  	gets logged in user
// @access 	Private
router.get('/', (request, response) => {
	response.send('Get logged in user user')
})

// @route 	POST api/users
// @desc  	Auth user and get user
// @access 	Public
router.post('/', (request, response) => {
	response.send('Login user')
})

module.exports = router