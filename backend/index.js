'use strict'
var mongoose = require('mongoose');
var port = '3600';
mongoose.promise = global.Promise;
var app = require('./app');
mongoose.connect('mongodb://localhost:27017/papeleria')
.then(()=>{
    console.log("Conexion estableciada con la bd");
    app.listen(port,()=>{
        console.log("Conexion establecida en el url: localhost:3600");
    })
})
.catch(err=>console.log(err))