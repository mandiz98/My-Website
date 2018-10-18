module.exports = function(req, res) {
    req.session.isLoggedIn = false
    return res.render('home.hbs')
}
