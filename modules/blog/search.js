//POST search request
myDB = require('../../db')

module.exports = function(req,res){
    const searchQuery = req.body.search

    myDB.searchForBlogpost(searchQuery,function(err, result){
        if(err){
            console.log(err)
            alert("Dummis det fungerar inte")
            return res.render("blog.hbs")
        }else{
            const model={
                blogposts: result
            }
            res.render("blog.hbs",model)
        }
    })
}
