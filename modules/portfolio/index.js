var router = require('express').Router()
var authenticated = require('../../middleware/isLoggedIn')

// GET /portfolio
router.get('/', require('./portfolio'))

// POST /project
router.post('/project', authenticated , require('./project'))

// GET /project/:id/edit - edit a project
router.get('/project/:id/edit', authenticated, require('./editProject'))

// GET /project/new
router.get('/project/new', authenticated, require('./newProject'))

module.exports = router