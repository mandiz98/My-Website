//Required content
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const myDB = require('./db')
const bcrypt = require('bcryptjs')
var multer  = require('multer')
var uploads = multer({ dest: 'uploads/' })
const hashedpassword = '$2a$10$KDYU/FHbc1jl77dRNypvTOR05GEnH41gyhLUCITAtmtzCFQeNhTFC';
//const get = require('./get')
//const post = require('./post')

const app = express()

//Methods
app.engine('hbs',expressHandlebars({
    defaultLayout: 'main',
    extname: '.hbs'
}))

app.use(bodyParser.urlencoded({extended: false}))

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: "cats are cute"
}))

//HOME page
app.get('/', function(request, response){
    myDB.getLatestBlogpost(function(error,blogpost){
        const model = {
            blogpost:blogpost[0],
            isLoggedIn : request.session.isLoggedIn
        }
        response.render("home.hbs",model)
    })
})

//ABOUT
app.get('/about', function(request, response){
    const model = {
        isLoggedIn : request.session.isLoggedIn
    }
    response.render("about.hbs",model)
})

//CONTACT
app.get('/contact',function(request,response){
    const model = {
        isLoggedIn : request.session.isLoggedIn
    }
    response.render("contact.hbs",model)
})

app.post('/contact',function(request,response){
    const fName = request.body.firstName
    const lName = request.body.lastName
    const email = request.body.email
    const message = request.body.message

    const errors = []

    if(fName.length == 0){
        errors.push("You must enter a first name.")
    }
    if(lName.length == 0){
        errors.push("You must enter a last name.")
    }
    if(email.length == 0){
        errors.push("You must enter an email.")
    }
    if(message.length == 0){
        errors.push("You must enter a message.")
    }

    const model={
        error: errors,
        firstName: fName,
        lastName: lName,
        email: email,
        message: message
    }

    if(errors.length == 0){
        myDB.newMessage(fName,lName,email,message,function(error,message){
            if(error){
                console.log(error.message)
                response.render("contact.hbs",{error: "Internal error"})
            } else {
                response.redirect("/")
            }
        })
    }
})

//PROJECTS
app.get('/projects',function(request,response){
    const model = {
        isLoggedIn : request.session.isLoggedIn
    }
    response.render("projects.hbs",model)
})

app.get('/editproject',function(request,response){  
    if(request.session.isLoggedIn){
        response.render("editproject.hbs")
    }else{
        response.redirect("/projects")
    }
})

//BLOG
app.get('/blog',function(request,response){
    myDB.getAllBlogposts(function(error,blogposts){
        const model={
            blogposts:blogposts,
            isLoggedIn : request.session.isLoggedIn
        }
        response.render("blog.hbs",model)
    })
})

app.get("/blog/:id", function(request, response){
    let id = request.params.id
    
	myDB.getBlogpostByID(id,function(error,post){
        const model ={
            blogposts:[post],
            isLoggedIn : request.session.isLoggedIn
        }
        response.render("blog.hbs",model)
    });
})

//EDIT BLOGPOST
app.get('/edit',function(request,response){
    if(request.session.isLoggedIn == true){
        response.render("editblog.hbs")
    }
    else{
        response.redirect("/login")
    }
})

app.post('/edit',function(request,response){
    if(request.session.isLoggedIn){
        response.redirect("/edit")      
    }
})

//NEW BLOGPOST
app.get('/post',function(request,response){
    const model = {
        isLoggedIn : request.session.isLoggedIn
    }
    if(request.session.isLoggedIn){
        response.render("post.hbs",model)
    }else{
        response.redirect("/login")
    }
})

app.post('/post',function(request,response){
    if(request.session.isLoggedIn){
        const title = request.body.title
        const blogpost = request.body.blogpost
        
        const errors = []
        
        if(title.length < 5){
            errors.push("Title must be at least 5 characters.")
        }
        
        if(title.length > 20){
            errors.push("Title must be less than 20 characters.")
        }
        
        const model={
            error: errors,
            title: title,
            inserted: false
        }
        
        if(errors.length == 0){
            myDB.newBlogpost(title, blogpost, function(error){    
                if(error){
                    response.render("post.hbs",{error:"internal server error"})
                }else{
                    response.redirect("/blog")
                }
                const model={
                    blogpost:blogpost
                }
            })
        }else{
            response.render("post.hbs",model)
        }
    }else{
        response.redirect("/login")
    }
})

//AUTHENTICATE
app.get('/login',function(request,response){
    if (request.session.isLoggedIn == true){
        response.redirect("/")
    }else{
        response.render("login.hbs")
    }
})

app.post('/login',function(request,response){
    const username = request.body.username 
    const password = request.body.password
    
    bcrypt.compare(password, hashedpassword, function(err, res) {
        // res == true
        if(username == "admin" && res == true){
            request.session.isLoggedIn = true
            response.redirect("/")
        }else{
            response.render("login.hbs")
        }
    });
    
})

app.get('/logout',function(request,response){
request.session.isLoggedIn = false
response.redirect('/')
})


//MISC
app.use(express.static('public',{redirect:false}))

app.use((request,response)=>{
    response.end('<h1>Page Not found</h1>')
})

app.listen(8080)