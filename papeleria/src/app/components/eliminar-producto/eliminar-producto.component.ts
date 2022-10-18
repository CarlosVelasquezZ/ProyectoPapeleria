import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Global } from '../../services/global';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css'],
  providers: [ProductoService]
})
export class EliminarProductoComponent implements OnInit {
  public url:String;
  public producto:Producto;
  public confirm:boolean;

  constructor(
    private _productoService:ProductoService,
    private _router:Router,
    private toastr: ToastrService,
    private _route:ActivatedRoute
  ) { 
    this.url=Global.url;
    this.producto=new Producto('','','','','','','','');
    this.confirm=false;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id=params['id'];
      console.log(id);
      this.getProducto(id);
    })
  }

  getProducto(id:String){
    this._productoService.getProducto(id).subscribe(
      response=>{
        this.producto=response.producto;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  setConfirm(confirm:boolean){
    this.confirm=confirm;
  }

  borrarProducto(id:String){
    this._productoService.deleteProducto(id).subscribe(
      response=>{
        if(response.producto){
          //alert('Producto eliminado')
          this.toastr.success('El producto ha sido eliminado con exito!', 'Producto eliminado');
          this._router.navigate(['/productosAdmin'])
        }
        this.producto=response.producto;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

}
