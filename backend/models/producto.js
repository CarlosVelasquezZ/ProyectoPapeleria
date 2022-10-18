'use strict'
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var ProductoSchema = Schema({
    nombre:String,
    stock:String,
    precio:String,
    categoria:String,
    subcategoria:String,
    proveedor:String,
    imagen:String
 })

 module.exports = mongoose.model('Producto', ProductoSchema);
 //mongoose toma el primer parametro lo pone en minusculas yb en plural
 //juguete se guarda en la bd