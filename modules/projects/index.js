var router = require('express').Router()
var authenticated = require('../../middleware/isLoggedIn')

// GET /projects
router.get('/', require('./projects'))

//POSt /project
router.post('/project', authenticated , require('./project'))

// get /project/:id/edit - edit a project
router.get('/project/:id/edit', authenticated, require('./editProject'))

router.get('/project/new', authenticated, require('./newProject'))

module.exports = router