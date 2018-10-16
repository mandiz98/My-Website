//GET ALL BLOGPOSTS ON BLOG PAGE
const myDB = require('../../db')

module.exports = function(req,  res,  next) {
    myDB.getAllBlogposts(function(err,  blogpost){
        const model={
            blogposts: blogpost
        }
        res.render("blog.hbs",  model)
    })
}
