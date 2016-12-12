'use strict'

const express = require("express")
let app = express()

app.use(express.static(__dirname + '/app'));

app.get('/students',(req,res)=>{
    var obj = Student.findAll().then(function(students){
        res.json(students);
    })
  
})

var Sequelize = require('sequelize')
  , sequelize = new Sequelize('students', 'rusuvalentin', '', {
      dialect: "mysql", 
      port:    3306, 
    });
    
  var Student = sequelize.define('Student', {
  nume: Sequelize.STRING,
  prenume: Sequelize.STRING
});

Student.sync({ force: false });
 

 //o sa fie pe un post

app.get("/students/add/:nume/:prenume",function(req,res){
    Student.create({
      nume:req.params.nume,
      prenume:req.params.prenume
      }).then(function(students){
          res.json(students);
      })
  })
app.get("*",function(req, res) {
    res.sendfile("./app/index.html");
})

app.listen(8080);