//GET ALL PROJECTS ON PORTFOLIO PAGE
const myDB = require('../../db')

module.exports = function(req, res, next){
    myDB.getAllProjects(function(err,  project){
        const model ={
            projects: project
        }
        res.render("portfolio.hbs",model)
    })
}
