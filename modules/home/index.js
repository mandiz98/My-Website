var router = require('express').Router()

// GET /
router.get('/', require('./home'))

module.exports = router