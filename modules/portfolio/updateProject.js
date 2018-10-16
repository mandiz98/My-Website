//UPDATE EXISTIG PROJECT
const myDB = require('../../db')

module.exports = function(req, res, next){
    let id = req.params.id

    myDB.updateProject(id, function(err,  project){
        res.redirect('/portfolio/'+id)
    })
}
