var router = require('express').Router()
// GET /blog
router.get('/', require('./home'))

module.exports = router