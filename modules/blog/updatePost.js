//UPDATE EXISTING BLOGPOST
const myDB = require('../../db')

module.exports = function(req,  res,  next) {
    let id = req.params.id
    const title = req.body.title
    const blogpost = req.body.blogpost 

    myDB.updateBlogpost(title, blogpost, id,  function(err) {
        res.redirect('/blog')
    })
}
