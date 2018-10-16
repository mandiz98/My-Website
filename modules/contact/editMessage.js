//GET EDIT EXISTING MESSAGE
const myDB = require('../../db')
const isInt = require('validator/lib/isInt')

module.exports = function(req,res,next){
    let id = req.params.id

    if(!isInt(id)){
        return res.render('notfound.hbs')
    }

    myDB.getMessagesById(id, function(err,message){
        if(!message) {
            return res.render('notfound.hbs')
        }

        const model = {
            messages: message
        }
        
        console.log(message)
        return res.render("editMessage.hbs",model)
    })
}
