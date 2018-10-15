//POST NEWLY CREATED PROJECT

const myDB = require('../../db')

module.exports = function(req,res){
    const title = req.body.title
    const description = req.body.description
    const image = req.image //?
    const projectFile = req.projectFile
    const errors = []

    //TODO: ERRORS

    const model = { 
        error: errors,
        title: title,
        description: description,
        image: image,
        projectFile: projectFile
    }

    if(errors.length === 0){
        myDB.newProject(title,description,image,projectFile,function(error){
            if(error){
                res.render("portfolio.hbs",{error:"internal server error"})
            }else{
                res.redirect("/projects")
            }
            const model={
                title: title,
                description: description,
                image: image,
                projectFile: projectFile,
            }
            res.render("portfolio.hbs",model)
        })
    }else{
        res.render("portfolio.hbs",model)
    }
}
