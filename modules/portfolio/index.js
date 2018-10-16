var router = require('express').Router()
var authenticated = require('../../middleware/isLoggedIn')

// GET /portfolio
router.get('/',  require('./portfolio'))

// GET /portfolio/project - Create a new project
router.get('/project', authenticated, require('./createProject'))

//GET /portfolio/project/:id - Specific project
router.get('/project/:id', require('./project'))

// POST /portfolio/project/new - upload new project
router.post('/project/new',  authenticated ,  require('./newProject'))

// GET /portfolio/project/:id/edit - edit existing project
router.get('/project/:id/edit',  authenticated,  require('./editProject'))

//POST /portfolio/project/:id/update - update existing project
router.post('/project/:id/update',  authenticated,  require('./updateProject'))

//POST /portfolio/project/:id/delete - delete existing project
router.post('/project/:id/delete',  authenticated,  require('./deleteProject'))

module.exports = router
