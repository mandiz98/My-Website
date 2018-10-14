const myDB = require('../../db')

module.exports = function(req, res, next) {
    let id = req.params.id
    myDB.updateBlogpost(id, function(err, post) {
        res.redirect('/blog/post/'+id)
    })
}