//Required content
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('database.db')

//Functions
db.run(
    `CREATE TABLE IF NOT EXISTS blogposts (
        title TEXT, 
        blogpost TEXT,  
        id INTEGER PRIMARY KEY AUTOINCREMENT)
    `
)
db.run(
    `CREATE TABLE IF NOT EXISTS projects (
        title TEXT, 
        description TEXT, 
        link TEXT,
        id INTEGER PRIMARY KEY AUTOINCREMENT)
    `
)
db.run(
    `CREATE TABLE IF NOT EXISTS messages (
        firstName TEXT, 
        lastName TEXT, 
        email TEXT, 
        message TEXT, 
        id INTEGER PRIMARY KEY AUTOINCREMENT)
    `
)

//BLOG
exports.getAllBlogposts = function(callback){
    const query = "SELECT * FROM blogposts ORDER BY id DESC"
   
    db.all(query, function(err, blogposts){
        callback(err, blogposts)
    })
}

exports.getLatestBlogpost = function(callback){
    const query = "SELECT *  FROM blogposts ORDER BY id DESC LIMIT 1"

    db.all(query, function(err, blogposts){
        callback(err, blogposts)
    })
}

exports.newBlogpost = function(title,  blogpost,  callback){

    const query = "INSERT INTO blogposts (title, blogpost) VALUES (?, ?)"
    
    db.run(query,  [title, blogpost],  callback)
}

exports.getBlogpostByID = function(id,  callback){

    const query = "SELECT * FROM blogposts WHERE id = ?"
    
    db.get(query, [id], function(err, post){
        callback(err, post)
    })
}

exports.updateBlogpost = function(newTitle, newBlogpost, id, callback){

    const query = "UPDATE blogposts SET title = ?,  blogpost = ? WHERE id = ?"
    const values = [newTitle, newBlogpost, id]

    db.run(query, values, function(err){
        callback(err)
    })
}

exports.deleteBlogpost = function(id, callback){

    const query = "DELETE FROM blogposts WHERE id = ?"

    db.run(query, [id], function(err){
        callback(err)
    })
}

//PROJECT
exports.getAllProjects = function(callback){
    const query = "SELECT * FROM projects ORDER BY id DESC"

    db.all(query, function(err, projects){
        callback(err, projects)
    })
}

exports.getLatestProjects = function(callback){
    const query = "SELECT * FROM projects ORDER BY id DESC LIMIT 3"

    db.all(query, function(err, projects){
        callback(err, projects)
    })
}

exports.newProject = function(title,description,link,callback){
    const query = "INSERT INTO projects (title, description, link) VALUES (?, ?, ?)"
    db.run(query, [title, description, link], callback)
}

exports.getProjectByID = function(id, callback){
    const query = "SELECT * FROM projects WHERE id = ?"

    db.get(query, [id], function(err, project){
        callback(err, project)
    })
}

exports.updateProject = function(id, newTitle, newDescription, newLink, callback){
    const query = "UPDATE projects SET title = ?, description = ?, link = ? WHERE id = ?"
    const values = [newTitle, newDescription, newLink, id]
    db.run(query, values, function(err){
        callback(err)
    })
}

exports.deleteProject = function(id, callback){
    const query = "DELETE FROM projects WHERE id = ?"
    db.run(query, [id], function(err){
        callback(err)
    })
}

//HOME PAGE
exports.getHomePageRescources = function(callback){
    
}

//CONTACT
exports.newMessage = function(fName, lName, email, message, callback){
    const query = "INSERT INTO messages (firstName, lastName, email, message) VALUES(?, ?, ?, ?)"

    db.run(query, [fName, lName, email, message], function(err){
        callback(err)
    })
}

exports.getAllMessages = function(callback){
    const query = "SELECT * FROM messages ORDER BY id DESC"

    db.all(query, function(err, messages){
        callback(err, messages)
    })
}

exports.getMessagesById = function(id, callback){
    const query = "SELECT * FROM messages WHERE id = ?"

    db.get(query, id, function(err, message){
        callback(err, message)
    })
}

exports.deleteMessages = function(id, callback){
    const query = "DELETE FROM messages WHERE id = ?"
    
    db.run(query, [id], function(err){
        callback(err)
    })
}

exports.updateMessage = function(id,  newFName,  newLName,  newEmail,  newMessage, callback){
    const query = "UPDATE messages SET firstName = ?,  lastName = ?,  email = ?,  message = ? WHERE id = ?"
    const values = [newFName, newLName, newEmail, newMessage, id]
    
    db.run(query, values, function(err){
        callback(err)
    })
}