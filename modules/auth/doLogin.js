const bcrypt = require('bcryptjs')
const hashedpassword = '$2a$10$KDYU/FHbc1jl77dRNypvTOR05GEnH41gyhLUCITAtmtzCFQeNhTFC';

module.exports = function(req, res, next) {
    const username = req.body.username 
    const password = req.body.password
    const error = []
        
    
    bcrypt.compare(password, hashedpassword, function(err, result) {
        // result == true
        if(username == "admin" && result ){
            req.session.isLoggedIn = true
            return res.redirect("/")
        }else{
            error.push(err)
            return res.render("login.hbs",err)
        }
    })
}
