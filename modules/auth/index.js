var router = require('express').Router()
var authenticated = require('../../middleware/isLoggedIn')
var guest = require('../../middleware/guest')

// GET /login
router.get('/login', guest , require('./login'))

// POST /login
router.post('/login', guest ,require('./doLogin'))

// GET /logout
router.get('/logout', authenticated ,require('./logout'))

module.exports = router