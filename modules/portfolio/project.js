//GET SPECIFIC PROJECT
const myDB = require('../../db')
const isInt = require('validator/lib/isInt')

module.exports = function(req, res, next){
    let id = req.params.id
    const err = []

    if(!isInt(id) || id===null){
        console.log(err.push("ERROR"))
        return res.render('notfound.hbs')
    }

    myDB.getProjectByID(id, function(err, project){
        if(!project || project === null){
            console.log(err.push("ERROR"))
            return res.render('notfound.hbs')
        }

        const model={
            projects: [project]
        }

        return res.render("portfolio.hbs", model)
    })
}
