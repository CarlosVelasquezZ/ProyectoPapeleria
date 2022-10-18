'use strict'
var express = require('express');
var PapeleriaController = require('../controllers/papeleria');

var router = express.Router();
var multipart = require('connect-multiparty');
var multiPartMiddeleWare = multipart({uploadDir:'./uploads'});

//Pagina de inicio

//Producto
router.get('/home',PapeleriaController.home);
//ver informacion de productos
router.get('/productos',PapeleriaController.getProductos);
//guardar producto
router.post('/guardar-producto',PapeleriaController.saveProducto);
//ver informacion de un producto
router.get('/producto/:id',PapeleriaController.getProducto);
//ver informacion de un producto por su nombre
router.get('/productoNombre/:nombre',PapeleriaController.getProductoNombre);
//Eliminar un producto
router.delete('/producto/:id',PapeleriaController.deleteProducto);
//Actualizar un Producto
router.put('/producto/:id',PapeleriaController.updateProducto);
//agregar imagenes
router.post('/subir-imagen/:id', multiPartMiddeleWare, PapeleriaController.uploadImagen);
//recuperar imagen
router.get('/get-imagen/:imagen', PapeleriaController.getImagen);
//buscar clientes
router.get('/busquedaProductos/:busqueda',PapeleriaController.buscarProductos);

//Cliente
//ver informacion de clientes
router.get('/clientes',PapeleriaController.getClientes);
//guardar informacion de un cliente
router.post('/guardar-cliente',PapeleriaController.saveCliente);
//ver informacion de un cliente
router.get('/cliente/:id',PapeleriaController.getCliente);
//ver informacion de un cliente por su nombre
router.get('/clienteNombre/:nombre',PapeleriaController.getClienteNombre);
//Eliminar un cliente
router.delete('/cliente/:id',PapeleriaController.deleteCliente);
//Actualizar un cliente
router.put('/cliente/:id',PapeleriaController.updateCliente);
//ver informacion de un cliente por correo
router.get('/clienteCorreo/:correo',PapeleriaController.getClienteCorreo);
module.exports = router;