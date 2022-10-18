import { Component, OnInit, ViewChild } from '@angular/core';
import { CargarService } from '../../services/cargar.service';
import { Global } from '../../services/global';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as $ from 'jquery'

@Component({
  selector: 'app-registro-producto',
  templateUrl: './registro-producto.component.html',
  styleUrls: ['./registro-producto.component.css'],
  providers: [ProductoService, CargarService]
})
export class RegistroProductoComponent implements OnInit {
  public titulo: string;
  public producto: Producto;
  public productoGuardar: Producto;
  public url: string;
  public status: string;
  public idGuardado: string;
  public archivosParaCargar: Array<File>;

  @ViewChild('archivoImagen') fileInput: any;

  constructor(
    private _productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router,
    private _cargarService: CargarService
  ) {
    this.titulo = "Crear nuevo producto";
    this.url = Global.url;
    this.producto = new Producto('', '', '', '', '', '', '', '');
    this.productoGuardar = new Producto('', '', '', '', '', '', '', '');
    this.status = "";
    this.idGuardado = "";
    this.archivosParaCargar = [];
  }

  ngOnInit(): void {
  }

  guardarProducto(form: NgForm) {
    if (this.archivosParaCargar.length > 0) {
      if (validar(form)) {
        this._productoService.guardarProducto(this.producto).subscribe(
          response => {
            if (response.producto) {
              if (this.archivosParaCargar) {
                this._cargarService.peticionRequest(Global.url + "subir-imagen/" + response.producto._id, [], this.archivosParaCargar, 'imagen')
                  .then((result: any) => {
                    this.productoGuardar = result.response;
                    //this.status='success';
                    this.toastr.success('El producto ha sido registrado con exito!', 'Producto Registrado');
                    this.router.navigate(['/admin']);
                    //console.log(result.producto._id)
                    //this.idGuardado=result.producto._id;
                    form.reset();
                    //this.fileInput.nativeElement.value='';
                  });
              } else {
                //this.productoGuardar=response.producto
                //this.status='success';
                this.toastr.success('El cliente ha sido registrado con exito!', 'Cliente Registrado');
                this.router.navigate(['/admin']);
                form.reset();
                //this.status='success';
              }
            } else {
              this.status = 'failed';
            }
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    }
    else {
      alert('Debe escoger una imagen')
    }

  }
  imagenChangeEvent(archivoSeleccionado: any) {
    this.archivosParaCargar = <Array<File>>archivoSeleccionado.target.files;
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
  nombre: /^([a-zA-Z]){1,20}$/,
  producto: /^([a-zA-Z ]){1,50}$/,
};