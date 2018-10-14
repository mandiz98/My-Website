const myDB = require('../../db')

module.exports = function(req, res, next) {
    myDB.getAllBlogposts(function(err, blogposts){
        const model={
            blogpost: blogposts[0]
        }
        res.render("home.hbs", model)
    })
}