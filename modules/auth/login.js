module.exports = function(req,  res,  next) {
    console.log('hit')
    res.render("login.hbs")
}
