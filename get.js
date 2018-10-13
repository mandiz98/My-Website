//Required content
const myDB = require('./db')

//Methods
exports.Home = function(callback){
    callback.redirect("/")
    myDB.getLatestBlogpost(function(error,blogpost){
        const model = {
            blogpost:blogpost[0],
            isLoggedIn : request.session.isLoggedIn
        }
        callback.render("home.hbs",model)
    })
}

exports.About('/about', function(request, response){
    const model = {
        isLoggedIn : request.session.isLoggedIn
    }
    response.render("about.hbs",model)
})

exports.Contact('/contact',function(request,response){
    const model = {
        isLoggedIn : request.session.isLoggedIn
    }
    response.render("contact.hbs",model)
})

exports.Projects('/projects',function(request,response){
    const model = {
        isLoggedIn : request.session.isLoggedIn
    }
    response.render("projects.hbs",model)
})

exports.EditProject('/editproject',function(request,response){
    const model = {
        isLoggedIn : request.session.isLoggedIn
    }
    response.render("editProject.hbs",model)
})

exports.Blog('/blog',function(request,response){
    myDB.getAllBlogposts(function(error,blogposts){
        const model={
            blogposts:blogposts,
            isLoggedIn : request.session.isLoggedIn
        }
        response.render("blog.hbs",model)
      
    })
})

exports.BlogByID("/blog/:id", function(request, response){
    let id = request.params.id
    
    myDB.getBlogpostByID(id,function(error,post){
        const model ={
            blogposts:[post],
            isLoggedIn : request.session.isLoggedIn
        }
        response.render("blog.hbs",model)
    });
})

exports.PostBlogpost('/post',function(request,response){
    const model = {
        isLoggedIn : request.session.isLoggedIn
    }
    if(request.session.isLoggedIn){
        response.render("post.hbs",model)
   }else{
       response.redirect("/login")
   }

})

exports.EditBlogpost('/edit',function(request,response){
    if(request.session.isLoggedIn == true){
        response.render("editblog.hbs")
    }
    else{
        response.redirect("/login")
    }
})

exports.Login('/login',function(request,response){
    if (request.session.isLoggedIn == true){
        response.redirect("/")
    }else{
        response.render("login.hbs")
    }

})

exports.Logout('/logout',function(request,response){
    request.session.isLoggedIn = false
    response.redirect('/')
})
