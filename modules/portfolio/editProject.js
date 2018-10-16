//GET EDIT EXISTING PROJECT
const myDB = require('../../db')
const isInt = require('validator/lib/isInt')

module.exports = function(req, res, next) {
    let id = req.params.id

    if(!isInt(id)) {
        return res.render('notfound.hbs')
    }

    myDB.getProjectByID(id, function(err, project){
        
        if(project) {
            return res.render('notfound.hbs')
        }

        const model = {
            portfolio: project
        }

        console.log(project)
        return res.render("editProject.hbs", model)
    })
}
