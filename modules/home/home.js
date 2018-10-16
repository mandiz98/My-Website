const myDB = require('../../db')

module.exports = function(req,  res,  next) {
    myDB.getLatestProjects(function(err,projects){
        myDB.getLatestBlogpost(function(err,  blogposts){
            const model={
                blogpost: blogposts[0],
                projects: projects
            }
            res.render("home.hbs",  model)
        })
    })
}