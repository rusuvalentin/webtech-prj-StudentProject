'use strict'

const express = require("express")
const bodyParser = require('body-parser')

let app = express()


app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json())

app.get('/students', (req, res) => {
    var obj = Student.findAll().then(function(students) {
        res.json(students);
    })

})

var Sequelize = require('sequelize'),
    sequelize = new Sequelize('students', 'rusuvalentin', '', {
        dialect: "mysql",
        port: 3306,
    });

var Student = sequelize.define('Student', {
    nume: Sequelize.STRING,
    prenume: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
            
        }
    }
});

Student.sync({
    force: false
});


//o sa fie pe un post

app.get("/students/add/:nume/:prenume/:email", function(req, res) {
    Student.create({
            nume: req.params.nume,
            prenume: req.params.prenume,
            email: req.params.email
        }).then(function(students) {
            res.json(students);
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

app.post('/students', (req, res) => {
    Student
        .create(req.body)
        .then(() => {
            res.status(201).send('creat')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})


app.get("/students/:id", function(req, res) {
    Student.find({
            where: {
                id: req.params.id
            }
        })
        .then(function(students) {
            res.json(students);
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })

})

app.delete('/students/:id', (req, res) => {
    Student
        .find({
            where : {id : req.params.id}
        })
        .then((student) => {
            return student.destroy()
        })
        .then(() => {
            res.status(200).send('sters')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})


app.put('/students/:id', (req, res) => {
    Student
        .find({
            where : {id : req.params.id}
        })
        .then((student) => {
            return student.updateAttributes(req.body)
        })
        .then(() => {
            res.status(201).send('updated')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('eroare put' + error)
        })
})

app.get("*", function(req, res) {
    res.sendfile("./app/index.html");
})

app.listen(8080);
