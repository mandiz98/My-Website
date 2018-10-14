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
        image TEXT,
        file TEXT,
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

exports.getBlogpostByID = function(id, callback){
    const query = "SELECT * FROM blogposts WHERE id = ?"
    
    db.get(query,[id],function(error,post){
        callback(error,post)
    })
}

exports.updateBlogpost = function(id,callback){
    const query = "UPDATE blogposts SET title = ?, blogpost = ? WHERE id = ?"
    const values = [title,blogpost,id]
    db.run(query,values,function(error){
        callback(error)
    })
}

exports.deleteBlogpost = function(id,callback){
    const query = "DELETE FROM blogposts WHERE id = ?"
    db.run(query,[id],function(error){
        callback(error)
    })
}

//PROJECT
exports.getAllProjects = function(callback){
    const query = "SELECT * FROM projects ORDER BY id DESC"

    db.all(query,function(error,projects){
        callback(error,blogposts)
    })
}

exports.getLatestProjects = function(callback){
    const query = "SELECT * FROM projects ORDER BY id DESC LIMIT 3"

    db.all(query,function(error,projects){
        callback(error,projects)
    })
}

exports.newProject = function(callback){
    const query = "INSERT INTO projects (title,description,image,file) VALUES (?,?,?,?)"
    db.run(query,[title,description,image,file],callback)
}

exports.getProjectByID = function(id,callback){
    const query = "SELECT * FROM projects WHERE id = ?"

    db.get(query,[id],function(error,project){
        callback(error,project)
    })
}

exports.updateProject = function(id,callback){
    const query = "UPDATE projects SET title = ?,description = ?,image = ?,file = ? WHERE id = ?"
    const values = [title,description,image,file,id]
    db.run(query,values,function(error){
        callback(error)
    })
}

exports.deleteProject = function(id,callback){
    const query = "DELETE FROM projects WHERE id = ?"
    db.run(query,[id],function(error){
        callback(error)
    })
}

//CONTACT
exports.newMessage = function(fName,lName,email,message,callback){
    const query = "INSERT INTO messages (firstName,lastName,email,message) VALUES(?,?,?,?)"

    db.run(query,[fName,lName,email,message],function(error){
        callback(error)
    })
}

exports.getAllMessages = function(callback){
    const query = "SELECT * FROM messages ORDER BY id DESC"

    db.all(query,function(error,messages){
        callback(error,messages)
    })
}