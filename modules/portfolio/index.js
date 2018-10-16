var router = require('express').Router()
var authenticated = require('../../middleware/isLoggedIn')

// GET /portfolio
router.get('/',  require('./portfolio'))

//GET /portfolio/:id - Specific project
router.get('/:id', require('./post'))

// GET /portfolio/post - Create a new project
router.get('/post', authenticated, require('./post'))

// POST /portfolio/post/new - upload new project
router.post('/post/new',  authenticated ,  require('./newProject'))

// GET /portfolio/:id/edit - edit existing project
router.get('/:id/edit',  authenticated,  require('./editProject'))

//POST /portfolio/:id/update - update existing project
router.post('/:id/update',  authenticated,  require('./updateProject'))

//POST /portfolio/:id/delete - delete existing project
router.post('/:id/delete',  authenticated,  require('./deleteProject'))

module.exports = router
