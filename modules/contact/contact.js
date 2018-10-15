module.exports = function(req, res, next) {
    if(req.session.isLoggedIn) {
        res.redirect('/contact/messages')
    }
    else {
        res.render("contact.hbs")
    }
}
