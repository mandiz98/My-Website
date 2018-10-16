//Required content
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
var FileStore = require('session-file-store')(session);
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

console.log('change')
//Methods
app.engine('hbs', expressHandlebars({
    defaultLayout: 'main', 
    extname: '.hbs'
}))

// set up sessions - filestore to persist session over app restart. (do not use in production!)
app.use(session({
    saveUninitialized: false, 
    resave: false, 
    store: new FileStore({
        secret: 'encryptthesessionfile'
    }), 
    secret: "cats are cute!"
}))

// add session variables to data in hbs
app.use(function(req,  res,  next){
    res.locals.session = req.session;
    next();
})

// serve public folder
app.use(express.static('public', {redirect:false}))

app.use(bodyParser.urlencoded({extended: false}))

// Root modules from path '/'
app.use(require('./modules/auth'))
app.use(require('./modules/home'))
app.use(require('./modules/about'))

// Modules using their own route '/<module>'
app.use('/contact',  require('./modules/contact'))
app.use('/blog',  require('./modules/blog'))
app.use('/portfolio',  require('./modules/portfolio/'))


// Start the application webserver
app.listen(8080,  function() {
    console.log("App now listening on port " + 8080)
})
/*
app.use(function(req, res){
    res.render("notfound.hbs")
})*/