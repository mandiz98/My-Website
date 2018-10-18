module.exports = function(req, res, next) {
    console.log('hit')
    return res.render("login.hbs")
}
