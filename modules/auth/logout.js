module.exports = function(req, res, next) {
    req.session.isLoggedIn = false
    res.redirect('/')
}
