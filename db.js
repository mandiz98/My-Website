//Required content
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('database.db')

//Functions
db.run(
    `CREATE TABLE IF NOT EXISTS messages (
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    message TEXT,
    id INTEGER PRIMARY KEY AUTOINCREMENT)`
)
db.run(
    `CREATE TABLE IF NOT EXISTS blogposts (
    title TEXT,
    blogpost TEXT, 
    id INTEGER PRIMARY KEY AUTOINCREMENT)`
)

exports.getAllBlogposts = function(callback){
    const query = "SELECT * FROM blogposts ORDER BY id DESC"
   
    db.all(query,function(error,blogposts){
        callback(error,blogposts)
    })
}

exports.getLatestBlogpost = function(callback){
    const query = "SELECT *  FROM blogposts ORDER BY id DESC LIMIT 1"

    db.all(query,function(error,blogposts){
        callback(error,blogposts)
    })
}

exports.newBlogpost = function(title, blogpost, callback){
    const query = "INSERT INTO blogposts (title,blogpost) VALUES (?,?)"
    db.run(query, [title,blogpost], callback)
}

exports.getUser = function(callback){
    const query = "SELECT username,password FROM users"
}

exports.getBlogpostByID = function(id, callback){
    const query = "SELECT * FROM blogposts WHERE id = ?"

    db.get(query,[id],function(error,post){
        callback(error,post)
    })
}

exports.newMessage = function(fName,lName,email,message,callback){
    const query = "INSERT INTO messages (firstName,lastName,email,message) VALUES(?,?,?,?)"
    db.run(query,[fName,lName,email,message],callback)
}