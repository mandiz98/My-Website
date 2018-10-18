//UPDATE EXISTING MESSAGE
const myDB = require('../../db')

module.exports = function(req, res, next){
    let id = req.params.id
    const fName = req.body.firstName
    const lName = req.body.lastName
    const email = req.body.email
    const message = req.body.message

    myDB.updateMessage(id, fName, lName, email, message, function(err){
        res.redirect('/contact/messages')
    })
}
