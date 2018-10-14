var router = require('express').Router()
var authenticated = require('../../middleware/isLoggedIn')
// GET /blog
router.get('/', require('./blog'))

// GET /blog/post/:id
router.get('/post/:id', require('./post'))

// GET /blog/post - Create a new post
router.get('/post', authenticated, require('./createPost'))

//POST /blog/post/new - upload a new post
router.post('/post/new', authenticated, require('./newPost'))

// GET /blog/post/:id/edit - edit an existing post
router.get('/post/:id/edit', authenticated, require('./editPost'))

// POST /blog/post/:id - Update an existing post
router.post('/post/:id/update', authenticated,require('./updatePost'))

// POST /blog/post/:id/delete - Delete existing post
router.post('/post/:id/delete', authenticated, require('./deletePost'))

module.exports = router