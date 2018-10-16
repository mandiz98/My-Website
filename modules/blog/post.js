//GET SPECIFIC POST
const myDB = require('../../db')
const isInt = require('validator/lib/isInt')

module.exports = function(req,  res,  next) {
    let id = req.params.id

    if(!isInt(id)){
        return res.render('notfound.hbs')
    }

	myDB.getBlogpostByID(id, function(error, post){
        if(!post){
            return res.render('notfound.hbs')
        }

        const model ={
            blogposts: [post]
        }
        
        return res.render("blog.hbs", model)
    })
}