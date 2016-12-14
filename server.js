'use strict'

const express = require("express")
const bodyParser = require('body-parser')

let app = express()


app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json())



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

var University = sequelize.define('University', {
    nume: Sequelize.STRING,
    adresa: Sequelize.STRING,
    nrTel: {
        type: Sequelize.INTEGER,
        validate: {
            len: [10, 10]
        }
    },
    site: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    }
});




Student.belongsTo(University,{
    foreignKey : {
        allowNull : false
    },
    onDelete : "CASCADE"
});
University.hasMany(Student,{
    foreignKey : {
        allowNull : false
    },
    onDelete : "CASCADE"
});

Student.sync({
    force: false
});
University.sync({
    force: false
})
app.get('/students', (req, res) => {
    var obj = Student.findAll().then(function(students) {
        res.json(students);
    })

})
app.get('/universities', (req, res) => {
    var obj2 = University.findAll().then(function(universities) {
        res.json(universities);
    })

})
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

app.get("/universities/add/:nume/:adresa/:nrTel/:site", function(req, res) {
    University.create({
            nume: req.params.nume,
            adresa: req.params.adresa,
            nrTel: req.params.nrTel,
            site: req.params.site
        }).then(function(universities) {
            res.json(universities);
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error' + error)
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

app.post('/universities', (req, res) => {
    University
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

app.get("/universities/:id", function(req, res) {
    University.find({
            where: {
                id: req.params.id
            }
        })
        .then(function(universities) {
            res.json(universities);
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })

})

app.delete('/students/:id', (req, res) => {
    Student
        .find({
            where: {
                id: req.params.id
            }
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

app.delete('/universities/:id', (req, res) => {
    University
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((university) => {
            return university.destroy()
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
            where: {
                id: req.params.id
            }
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


app.put('/universities/:id', (req, res) => {
    University
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((university) => {
            return university.updateAttributes(req.body)
        })
        .then(() => {
            res.status(201).send('updated')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('eroare put university' + error)
        })
})

app.get("*", function(req, res) {
    res.sendfile("./app/index.html");
})

app.listen(8080);
