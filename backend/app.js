'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var papeleria_routes = require('./routes/papeleria');

//Todo lo que llega y envia se convierte en json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configuracion de las cabeceras
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, X-Request-With,Content-Type,Accept, Access-Control-Allow,Request-Method');
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
    next();
});

//rutas
app.use('/', papeleria_routes);


module.exports = app;