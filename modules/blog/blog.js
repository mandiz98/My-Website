const myDB = require('../../db')

module.exports = function(req, res, next) {
    myDB.getAllBlogposts(function(err, blogposts){
        const model={
            blogposts: blogposts
        }
        res.render("blog.hbs", model)
    })
}