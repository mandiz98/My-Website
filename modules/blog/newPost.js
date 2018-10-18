//POST NEW BLOGPOST
const myDB = require('../../db')

module.exports = function(req, res){
    const title = req.body.title
    const blogpost = req.body.blogpost
    const errors = []
    
    if(title.length < 5){
        errors.push("Title must be at least 5 characters.")
    }
    if(title.length > 20){
        errors.push("Title must be less than 20 characters.")
    }

    const model={
        error: errors, 
        title: title,
        blogpost: blogpost
    }
    
    if(errors.length == 0){
        myDB.newBlogpost(title, blogpost, function(error){    
            if(error){
                return res.render("post.hbs", {error:"internal server error"})
            }
            const model={
                blogpost:blogpost
            }
            return res.redirect("/blog")
        })
    }else{
        return res.render("post.hbs", model)
    }
}
