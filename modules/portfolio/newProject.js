//POST NEWLY CREATED PROJECT
const myDB = require('../../db')

module.exports = function(req, res){
    const title = req.body.title
    const description = req.body.description
    const link = req.body.link
    const errors = []

    const model = { 
        error: errors, 
        title: title, 
        description: description, 
        link: link
    }

    if(errors.length === 0){
        myDB.newProject(title, description, link, function(error){
            if(error){
                return res.render("portfolio.hbs", {error:"internal server error"})
            }else{
                res.redirect("/portfolio")
            }
            const model={
                title: title, 
                description: description, 
                link: link
            }
            return res.render("portfolio.hbs", model)
        })
    }else{
        return res.render("portfolio.hbs", model)
    }
}
