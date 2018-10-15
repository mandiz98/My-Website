var router = require('express').Router()
var authenticated = require('../../middleware/isLoggedIn')

// GET /projects
router.get('/', require('./projects'))

//GET /projects/project/:id - Speific project
router.get('/project/:id',require('./project'))

// GET /projects/project/post - Create a new project
router.get('/project/post', authenticated, require('./createProject'))

// POST /projects/project/post/new - upload new project
router.post('/project/post/new', authenticated , require('./newProject'))

// GET /projects/project/:id/edit - edit existing project
router.get('/project/:id/edit', authenticated, require('./editProject'))

//POST /projects/project/:id/update - update existing project
router.post('/project/:id/update', authenticated, require('./updateProject'))

//POST /projects/project/:id/delete - delete existing project
router.post('/project/:id/delete', authenticated, require('./deleteProject'))

module.exports = router
