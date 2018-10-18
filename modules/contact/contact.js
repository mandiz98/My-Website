module.exports = function(req, res, next) {
    const model={
        token: req.csrfToken()
    }
    if(req.session.isLoggedIn) {
        res.redirect('/contact/messages')
    }
   else{
        res.render("contact.hbs",model)
    }
}
