'use strict'

const express = require("express")
let app = express()

app.use(express.static(__dirname + '/app'));

app.get((req,res)=>{
    res.status(200).send('some text')
})


app.listen(8080);