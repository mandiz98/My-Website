const myDB = require('../../db')

module.exports = function(request,response){
    const errors = []

    const model={
        error: errors
    }
    if(errors.length == 0){
        myDB.getAllMessages(function(error,message){
            const model={
                messages : message
            }
            response.render("contactMessages.hbs",model)
        })
    }else{
        console.log(error.message)
        response.render("contactMessages.hbs",model)
    }
}
