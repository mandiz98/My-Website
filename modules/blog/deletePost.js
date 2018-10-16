//POST DELETE BLOGPOST
const myDB = require('../../db')

module.exports = function(req,  res,  next) {
    let id = req.params.id

    myDB.deleteBlogpost(id,  function(err){
        res.redirect("/blog")
    })
}
