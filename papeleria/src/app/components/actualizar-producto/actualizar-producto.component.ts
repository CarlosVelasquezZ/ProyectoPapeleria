import { Component, OnInit } from '@angular/core';
import { CargarService } from '../../services/cargar.service';
import { ProductoService } from '../../services/producto.service';
import { Global } from '../../services/global';
import { NgForm } from '@angular/forms';
import { Producto } from '../../models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actualizar-producto',
  //templateUrl: './actualizar-producto.component.html',
  templateUrl: '../registro-producto/registro-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css'],
  providers:[ProductoService,CargarService]
})
export class ActualizarProductoComponent implements OnInit {
  public titulo:string;
  public producto:Producto;
  public productoGuardar:Producto;
  public url:string;
  public status:string;
  public idGuardado:string;
  public archivosParaCargar:Array<File>;

  constructor(
    private _productoService:ProductoService,
    private _cargarService:CargarService,
    private toastr: ToastrService,
    private router:Router,
    private _route:ActivatedRoute
  ) { 
    this.url=Global.url;
    this.producto=new Producto('','','','','','','','');
    this.productoGuardar=new Producto('','','','','','','','');
    this.status="";
    this.idGuardado="";
    this.archivosParaCargar=[];
    this.titulo="Editar producto";
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id=params['id'];
      console.log(id);
      this.getProducto(id);
    });
  }

  getProducto(id:String){
    this._productoService.getProducto(id).subscribe(
      response=>{
        this.producto=response.producto;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  guardarProducto(form: NgForm) {
    if (validar(form)) {
      this._productoService.updateProducto(this.producto).subscribe(
        response => {
          if (response.producto) {
            if (this.archivosParaCargar) {
              this._cargarService.peticionRequest(Global.url + "subir-imagen/" + response.producto._id, [], this.archivosParaCargar, 'imagen')
                .then((result: any) => {
                  this.productoGuardar = result.response;
                  this.toastr.success('Produtco actualizado correctamente!', 'Producto Registrado');
                  this.router.navigate(['/productosAdmin']);
                  form.reset();
                });
            } else {
              this.productoGuardar = response.producto
              this.toastr.success('Produtco actualizado correctamente!', 'Producto Registrado');
              this.router.navigate(['/productosAdmin']);
              form.reset();
            }
          } else {
            this.status = 'failed';
          }
        },
        error => {
          console.log(<any>error);
        }
      );
      this.toastr.success('Produtco actualizado correctamente!', 'Producto Registrado');
      this.router.navigate(['/productosAdmin']);
      form.reset();
    }
  }
  imagenChangeEvent(archivoSeleccionado:any){
    this.archivosParaCargar=<Array<File>>archivoSeleccionado.target.files;
  }
}

function validar(form: NgForm) {
  if (!validaciones.nombre.test(form.value.categoria)) {
    alert('Categoria incorrecta')
    return false;
  }
  if (!validaciones.nombre.test(form.value.subcategoria)) {
    alert('Sub-Categoria incorrecta')
    return false;
  }
  if (!validaciones.nombre.test(form.value.proveedor)) {
    alert('Proveedor incorrecto')
    return false;
  }
  if (!validaciones.producto.test(form.value.nombre)) {
    alert('Nombre incorrecto')
    return false;
  }
  return true
}
const validaciones = {
  nombre: /^([a-zA-Z ]){1,20}$/,
  producto: /^([a-zA-Z ]){1,50}$/,
};
