'use strict'
var Producto = require("../models/producto");
var Cliente = require("../models/cliente");
var path = require('path');
var fs = require('fs');

const { exists } = require("../models/producto");
const { exists2 } = require("../models/cliente");

var controller = {
    home:function(req,res){
        return res.status(201).send(
            "<h1>Hola desde el controlador</h1>"
        );
    },
    getProductos:function(req,res){
        Producto.find({}).sort().exec((err,productos)=>{
            if(err) return res.status(500).send({message:'Error al resuperar datos'});
            if(!productos) return res.status(404).send({message:'No hay productos que mostrar para mostrar'});
            return res.status(200).send({productos});
        })
    },
    saveProducto:function(req,res){
        var producto = new Producto();
        var params = req.body;
        
        producto.nombre = params.nombre;
        producto.stock = params.stock;
        producto.precio = params.precio;
        producto.categoria = params.categoria;
        producto.subcategoria = params.subcategoria;
        producto.proveedor = params.proveedor;

        producto.save((err, productoStored)=>{
            if(err) return res.status(500).send({message:'Error al guardar producto'});
            if(!productoStored) return res.status(404).send({message:'No se ha guardado el producto'});
            return res.status(200).send({producto:productoStored});
        })
    },
    getProducto:function(req, res){
        var productoid = req.params.id;
        if(productoid == null) return res.status(404).send({message:'El producto no existe'});
        Producto.findById(productoid,(err, producto)=>{
            if(err) return res.status(500).send({message:'Error al recuperar producto'});
            if(!producto) return res.status(404).send({message:'El producto no existe'});
            return res.status(200).send({producto});
        })
    },
    getProductoNombre:function(req,res){
        var productoNombre = req.params.nombre;
        if(productoNombre == null) return res.status(404).send({message:'El producto no existe'});
        Producto.findOne({nombre: productoNombre},(err, producto)=>{
            if(err) return res.status(500).send({message:'Error al resuperar producto'});
            if(!producto) return res.status(404).send({message:'El producto no existe'});
            return res.status(200).send({producto});
        })
    },
    deleteProducto:function(req,res){
        var productoid = req.params.id;
        Producto.findByIdAndRemove(productoid,(err, productoRemoved)=>{
            if(err) return res.status(500).send({message:'Error al eliminar producto'});
            if(!productoRemoved) return res.status(404).send({message:'No se puede eliminar producto'});
            return res.status(200).send({producto:productoRemoved});
        })
    },
    updateProducto:function(req,res){
        var productoid = req.params.id;
        var update = req.body;

        Producto.findByIdAndUpdate(productoid,update,{new:true},(err, productoUpdated)=>{
            if(err) return res.status(500).send({message:'Error al actualizar producto'});
            if(!productoUpdated) return res.status(404).send({message:'El producto no existe para actualizarse'});
            return res.status(200).send({producto:productoUpdated});
        })
    },
    uploadImagen:function(req,res){
        var productoid = req.params.id;
        var fileName = 'Imagen no subida';
        if (req.files){
            var filePath = req.files.imagen.path;
            var file_split = filePath.split('\\');
            var fileName = file_split[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];
            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                Producto.findByIdAndUpdate(productoid,{imagen:fileName},{new:true},(err, productoUpdated)=>{
                    if(err) return res.status(500).send({message:'La imagen no se ha subido'});
                    if(!productoUpdated) return res.status(404).send({message:'El producto no existe y no se subio la imagen'});
                    return res.status(200).send({producto:productoUpdated});
                })
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({message:'La extension no es valida'});
                });
            } 
        }else{
            return res.status(200).send({message:fileName});
        }
    },
    getImagen:function(req, res){
        var file = req.params.imagen;
        var path_file = "./uploads/"+file;
        fs.exists(path_file,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                res.status(200).send({message:'No existe la imagen'});
            }
        })
    },
    buscarProductos:function(req,res){
        var nombre = req.params.busqueda;
        //var str = '\"'+nombre+'\"';
        const query2 = { $text: { $search: '\"'+nombre+'\"' } };
        Producto.find(query2).sort().exec((err,productos)=>{
            if(err) return res.status(500).send({message:'Error al resuperar datos'});
            if(!productos) return res.status(404).send({message:'No hay productos que mostrar para mostrar'});
            return res.status(200).send({productos});
        })
    },

    //Cliente
    getClientes:function(req,res){
        Cliente.find({}).sort().exec((err,productos)=>{
            if(err) return res.status(500).send({message:'Error al resuperar datos'});
            if(!productos) return res.status(404).send({message:'No hay clientes que mostrar para mostrar'});
            return res.status(200).send({productos});
        })
    },
    saveCliente:function(req,res){
        var cliente = new Cliente();
        var params = req.body;
        
        cliente.nombre = params.nombre;
        cliente.tipo = params.tipo;
        cliente.ci = params.ci;
        cliente.correo = params.correo;
        cliente.direccion = params.direccion;
        cliente.telefono = params.telefono;
        cliente.contrasenia = params.contrasenia;

        cliente.save((err, clienteStored)=>{
            if(err) return res.status(500).send({message:'Error al guardar cliente'});
            if(!clienteStored) return res.status(404).send({message:'No se ha guardado el cliente'});
            return res.status(200).send({cliente:clienteStored});
        })
    },
    getCliente:function(req, res){
        var clienteid = req.params.id;
        if(clienteid == null) return res.status(404).send({message:'El cliente no existe'});
        Cliente.findById(clienteid,(err, cliente)=>{
            if(err) return res.status(500).send({message:'Error al recuperar cliente'});
            if(!cliente) return res.status(404).send({message:'El cliente no existe'});
            return res.status(200).send({cliente});
        })
    },
    getClienteNombre:function(req,res){
        var clienteNombre = req.params.nombre;
        if(clienteNombre == null) return res.status(404).send({message:'El cliente no existe'});
        Cliente.findOne({nombre: clienteNombre},(err, cliente)=>{
            if(err) return res.status(500).send({message:'Error al resuperar cliente'});
            if(!cliente) return res.status(404).send({message:'El cliente no existe'});
            return res.status(200).send({cliente});
        })
    },
    //Carlos
    getClienteCorreo:function(req,res){
        var clienteCorreo = req.params.correo;
        if(clienteCorreo == null) return res.status(404).send({message:'El cliente no existe'});
        Cliente.findOne({correo: clienteCorreo},(err, cliente)=>{
            if(err) return res.status(500).send({message:'Error al resuperar cliente'});
            if(!cliente) return res.status(404).send({message:'El cliente no existe'});
            return res.status(200).send({cliente});
        })
    },
    //fin Carlos
    deleteCliente:function(req,res){
        var clienteid = req.params.id;
        Cliente.findByIdAndRemove(clienteid,(err, clienteRemoved)=>{
            if(err) return res.status(500).send({message:'Error al eliminar cliente'});
            if(!clienteRemoved) return res.status(404).send({message:'No se puede eliminar cliente'});
            return res.status(200).send({cliente:clienteRemoved});
        })
    },
    updateCliente:function(req,res){
        var clienteid = req.params.id;
        var update = req.body;

        Cliente.findByIdAndUpdate(clienteid,update,{new:true},(err, clienteUpdated)=>{
            if(err) return res.status(500).send({message:'Error al actualizar cliente'});
            if(!clienteUpdated) return res.status(404).send({message:'El cliente no existe para actualizarse'});
            return res.status(200).send({cliente:clienteUpdated});
        })
    }


}
module.exports = controller;