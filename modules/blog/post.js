//GET SPECIFIC POST
const myDB = require('../../db')

module.exports = function(req,  res,  next) {
    let id = req.params.id

	myDB.getBlogpostByID(id, function(error, post){
        
        const model ={
            blogposts: [post]
        }
        
        return res.render("blog.hbs", model)
    })
}