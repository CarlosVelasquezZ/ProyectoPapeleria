'use strict'
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var ClienteSchema = Schema({
    nombre:String,
    tipo:String,
    ci:String,
    correo:String,
    direccion:String,
    telefono:String,
    contrasenia:String,
 })

 module.exports = mongoose.model('Cliente', ClienteSchema);
 //mongoose toma el primer parametro lo pone en minusculas yb en plural
 //juguete se guarda en la bd