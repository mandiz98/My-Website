const myDB = require('../../db')

module.exports = function(req,  res,  next) {
    myDB.getLatestBlogpost(function(err,  blogposts){
        const model={
            blogpost: blogposts[0]
        }
        res.render("home.hbs",  model)
    })
}