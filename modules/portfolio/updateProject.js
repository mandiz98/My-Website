//UPDATE EXISTIG PROJECT
const myDB = require('../../db')

module.exports = function(req, res, next){
    let id = req.params.id
    const title = req.body.title
    const description = req.body.description
    const link = req.body.link


    myDB.updateProject(id,title,description,link, function(err){
        res.redirect('/portfolio/project/'+id)
    })
}
