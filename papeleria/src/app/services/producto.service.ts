import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Global } from '../services/global';
import { Observable } from 'rxjs';

@Injectable()
export class ProductoService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }
    //Ver informacion de todos los productos
    getProductos():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'productos',{headers:headers});
    }
    //guardar producto
    guardarProducto(producto:Producto):Observable<any>{
        let params=JSON.stringify(producto);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'guardar-producto',params,{headers:headers});
    }
    //obtener un producto
    getProducto(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'producto/'+id,{headers:headers});
    }
    //eliminar un producto
    deleteProducto(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'producto/'+id,{headers:headers});
    }
    //actualizar producto
    updateProducto(producto:Producto):Observable<any>{
        let params=JSON.stringify(producto);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'producto/'+producto._id,params,{headers:headers});
    }
}