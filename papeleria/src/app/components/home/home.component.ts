import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Global } from '../../services/global';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { PasswordComponent } from '../password/password.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ClienteService]
})
export class HomeComponent implements OnInit {
  public clientes:Cliente[];
  public url:string;

  constructor(
    private _clienteService:ClienteService,
    private _router:Router
  ) { 
    this.url=Global.url;
    this.clientes=[];
  }

  ngOnInit(): void {
    if(localStorage.getItem("nombre") != undefined){
      var a=localStorage.getItem('recarga')
      var b=localStorage.getItem('nombre')
  
      if(b?.length!=0){
        $(".cambiar").html("<h3 style='text-align: center;'>Nombre: "+b+"</h3>");
      }
      if(a=='1'){
        window.location.reload();
        localStorage.setItem('recarga','2');
      }
      //$(".cambiar").html("<span>'"+b+"'</span>");
    }
  }
  guardar(form:NgForm){
    var email=form.value.email;
    var pass=form.value.password;
    //alert()
    if(validar(form)){
      this._clienteService.getCliente(email).subscribe(
        response=>{
          if(response.cliente){
            this.clientes=response.cliente;
            var a=JSON.stringify(this.clientes);
            var b=JSON.parse(a);
            if(b.tipo=='administrador'){
              if(b.contrasenia==pass){
                //this._router.navigate(['/encabezado'])
                this._router.navigate(['/admin'])
                localStorage.setItem('tipo',b.tipo);
                localStorage.setItem('nombre',b.nombre);
                localStorage.setItem('recarga','1');
                alert('Bienvenido '+b.nombre);
              }
              else{
                alert('Contraseña incorrecta')
              }
            }
            else{
              if(b.contrasenia==pass){
                //this._router.navigate(['/encabezado'])
                localStorage.setItem('recarga','1');
                localStorage.setItem('tipo',b.tipo);
                localStorage.setItem('nombre',b.nombre);
                alert('Bienvenido '+b.nombre);
                window.location.reload();
              }
              else{
                alert('Contraseña incorrecta')
              }
            }
          }
        },
        error=>{
          alert('Usuario no registrado')
          //console.log(<any>error);
        }
      );
    }
    //alert(form.value);
  }
}

function validar(form:NgForm) {
  var email=form.value.email;
  var pass=form.value.password;
  if(email.length==0 && pass.length==0){
    alert('Debe ingresar datos');
    return false;
  }
  if(email.length==0){
    alert('Debe ingresar un email registrado');
    return false;
  }
  if(pass.length==0){
    alert('Debe ingresar una contrasña');
    return false;
  }
  if(!validaciones.correo.test(email)){
    alert('Correo electrónico incorrecto')
    return false;
  }  
  return true
}
const validaciones = {
  correo: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
};