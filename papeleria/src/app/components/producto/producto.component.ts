import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Global } from '../../services/global';
import { Producto } from '../../models/producto';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [ProductoService]
})
export class ProductoComponent implements OnInit {


  public productos:Producto[];
  public url:String;
  public control:Boolean;
  public categoria:String;
  public subcategoria:String;
  constructor(
    private _productoService:ProductoService,
    private _router:Router,
    private _route:ActivatedRoute 
  ) { 
    this.url = Global.url;
    this.productos = [];
    this.control = false;
    this.categoria = "";
    this.subcategoria = "";
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      if(params['categoria'] == null){
        this.getProductos();
      }else{
        let cat = params['categoria'];
        this.getProductosCategoria(cat);
      }
    })
  }

  getProductos(){
    this._productoService.getProductos().subscribe(
      response=>{
        if(response.productos){
          for (let producto of response.productos){
            if(producto.stock != 0){
              this.productos.push(producto) //response.productos;
            }
          }
        }
      },
      error=>{
        console.log(<any>error);
      }

    );
  }

  getProductosCategoria(cat:string){
    this.productos = [];
    this._productoService.getProductos().subscribe(
      response=>{
        if(response.productos){
          for (let producto of response.productos){
            if(producto.categoria == cat){
              this.categoria = cat;
              this.subcategoria = "";
              this.productos.push(producto);
            }
            if(producto.subcategoria == cat){
              this.categoria = producto.categoria;
              this.subcategoria = cat;
              this.productos.push(producto);
            }
          }
        }
      },
      error=>{
        console.log(<any>error);
      }

    );
  }

}
