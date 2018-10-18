//GET ALL PROJECTS ON PORTFOLIO PAGE
const myDB = require('../../db')
const paginate = require('express-paginate')
module.exports = function(req, res, next){
    const page = !!req.query.page ? (req.query.page <= 1 ? 1 : req.query.page) : 1
    // // ^^
    // let page = undefined
    // if(req.query.page === true) {
    //     if(req.query.page <= 1) {
    //         page = 1
    //     } else {
    //         page = req.query.page
    //     }
    // } else {
    //     page = 1
    // }

    const limit = parseInt(req.query.limit) || 3
    const skip = limit * (page - 1)

    console.log(page, limit, skip)

    myDB.getProjectsAmount(function(err, total) {
        let totalPages = Math.ceil(total.c / limit)
        myDB.getAllProjectsPage(limit, skip, function(err, projects) {

            if (!projects.length) {
                return res.render("notfound.hbs")
            }

            const model = {
                projects: projects,
                totalPages: totalPages,
                limit: limit
            }
            console.log(model)
            res.render('portfolio.hbs', model)            
        })
    })
    // myDB.getAllProjectsPage(limit, skip, function(err, projectPage){
    //     console.log(projectPage)
    //     const model ={
    //         projects: project
    //     }
    //     res.render("portfolio.hbs",model)
    // })
}
