var router = require('express').Router()

// GET /about
router.get('/about', require('./about'))

module.exports = router
