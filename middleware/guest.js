module.exports = function(req, res, next) {
    if(req.session.isLoggedIn) {
        res.redirect('/')
    }else{
        next()
    }
}