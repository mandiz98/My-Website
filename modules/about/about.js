const myDB = require('../../db')

module.exports = function(req, res, next) {
    res.render("about.hbs")
}