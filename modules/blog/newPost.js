module.exports = function(req,res){
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
        inserted: false
    }
    
    if(errors.length == 0){
        myDB.newBlogpost(title, blogpost, function(error){    
            if(error){
                res.render("post.hbs",{error:"internal server error"})
            }else{
                res.redirect("/blog")
            }
            const model={
                blogpost:blogpost
            }
        })
    }else{
        res.render("post.hbs",model)
    }
}