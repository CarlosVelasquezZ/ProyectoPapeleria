import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../services/global';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable()
export class ClienteService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }
    //obtener un cliente por el correo
    getCliente(correo:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'clienteCorreo/'+correo,{headers:headers});
    }

    //guardar un cliente
    guardarCliente(cliente:Cliente):Observable<any>{
        let params=JSON.stringify(cliente);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'guardar-cliente',params,{headers:headers});
    }
}