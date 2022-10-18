import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router, Params } from '@angular/router';
import { isNumeric } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { Global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css'],
  providers: [ProductoService]
})
export class DetalleProductoComponent implements OnInit {
  public url:string;
  public producto:Producto;
  public confirm:boolean;
  public ruta;
  constructor(
    private _productoService:ProductoService,
    private _router:Router,
    private _route:ActivatedRoute,
    private toastr: ToastrService
  ) { 
    this.url = Global.url;
    this.producto = new Producto('','','','','','','','');
    this.confirm = false;
    this.ruta = "";
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id = params['id'];
      console.log(id);
      this.getProducto(id);
    })
  }

  getProducto(id:string){
    this._productoService.getProducto(id).subscribe(
      response=>{
        this.producto = response.producto
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  aniadirCarrito(form: NgForm, stock: string, id: string) {
    if (localStorage.getItem('tipo') != 'administrador') {
      //funcion validar
      if (form.value.cantidad >= 1 && form.value.cantidad <= stock) {
        //Guardar producto en el carrito
        if (localStorage.getItem("productoCarrito") == undefined) {
          var prod: Array<string>;
          prod = [];
          let mi_objeto = { producto: this.producto._id, cantidad: form.value.cantidad };
          prod.push(JSON.stringify(mi_objeto));
          localStorage.setItem("productoCarrito", JSON.stringify(prod));
          alert("Producto ingresado");
          this._router.navigate(["/carrito"]);
        } else {
          var objetos = JSON.parse(localStorage.getItem('productoCarrito') || '{}');
          //datos a ingresar
          let mi_objeto = { producto: this.producto._id, cantidad: form.value.cantidad };
          //Verificar que no se repitan productos
          let aux = 0;
          for (var i in objetos) {
            var data = JSON.parse(objetos[i]);
            if (data.producto === mi_objeto.producto) {
              aux += 1;
            }
          }
          if (aux == 0) {
            //ingresar datos
            objetos.push(JSON.stringify(mi_objeto));

            //Guardar en localStorage
            localStorage.setItem("productoCarrito", JSON.stringify(objetos));
            alert("Producto ingresado");
            this._router.navigate(["/carrito"]);
          } else {
            alert("Producto ya existente en el carrito");
            this._router.navigate(["/productos"]);
          }
        }
      } else {
        if (form.value >= stock) {
          alert("Stock no disponible, Ingrese un numero");
          window.location.reload();
        }
      }
    }
    else {
      alert('Acceso denegado, solo clientes pueden agregar productos al carrito')
      this._router.navigate(['/admin']);
    }
  }
}
