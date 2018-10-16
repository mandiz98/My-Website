//POST DELETE PROJECT
const myDB = require('../../db')
const isInt = require('validator/lib/isInt')

module.exports = function(req,res,next){
    let id = req.params.id

    if (!isInt(id)){
        return res.render('notfound.hbs')
    }

    myDB.deleteProject(id,function(err){
        if(err){
            return res.render('notfound.hbs')
        }
        res.redirect("/projects")
    })
}
