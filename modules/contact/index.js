var router = require('express').Router()
var authenticated = require('../../middleware/isLoggedIn')
var guest = require('../../middleware/guest')

//GET /contact
router.get('/', require('./contact'))

//POST /contact/newMessage - post the contact form
router.post('/', guest, require('./newMessage'))

//GET /contact/messages - get all messages
router.get('/messages', authenticated, require('./messages'))

module.exports = router