'use strict'

const express = require("express")
let app = express()



app.get((req,res)=>{
    res.status(200).send('some text')
})


app.listen(8080);