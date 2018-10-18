module.exports = function(req, res, next) {
    // set default or minimum to 5
    if (req.query.limit <= 5) req.query.limit = 5;
    next();
}