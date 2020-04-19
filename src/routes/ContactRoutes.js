const express = require('express')
const router = express.Router()

// @route 	GET api/contacts
// @desc  	gets all users contacts
// @access 	Private
router.get('/', (request, response) => {
	response.send('Get user contacts')
})

// @route 	POST api/contacts
// @desc  	Add new contact
// @access 	private
router.post('/', (request, response) => {
	response.send('Add new contact')
})

// @route 	PUT api/contacts
// @desc  	update contact
// @access 	private
router.put('/:id', (request, response) => {
	response.send('update contact')
})

// @route 	DELETE api/contacts
// @desc  	delete contact
// @access 	private
router.delete('/:id', (request, response) => {
	response.send('Delete contact')
})

module.exports = router