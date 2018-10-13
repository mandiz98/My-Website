//Required content
const myDB = require('./db')
const bcrypt = require('bcryptjs')
const hashedpassword = '$2a$10$KDYU/FHbc1jl77dRNypvTOR05GEnH41gyhLUCITAtmtzCFQeNhTFC';

//Functions
exports.postContact('/contact',function(request,response){
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

exports.postNewBlogPost('/post',function(request,response){ 
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

exports.postNewProject('/newproject',function(request,response){
    
})

exports.postLoginRequest('/login',function(request,response){
    const username = request.body.username 
    const password = request.body.password
    
    bcrypt.compare(password, hashedpassword, function(err, res) {
        if(username == "admin" && res == true){
            request.session.isLoggedIn = true
            response.redirect("/")
        }else{
            response.render("login.hbs")
        }
    });
})
