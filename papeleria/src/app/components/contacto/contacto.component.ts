import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  enviar(form:NgForm){
    if(validar(form)){
      alert('Nos pondremos en contacto enseguida');
      this.toastr.success('Formulario Enviado', 'Gracias por contactarte');
      this.router.navigate(['/inicio']);
    }
  }
}
function validar(form:NgForm) {
  if(form.value.nombre.length==0){
    alert('El nombre es obligatorio')
    return false;
  }  
  if(!validaciones.nombre.test(form.value.nombre)){
    alert('Nombre incorrecto')
    return false;
  }  
  if(form.value.email.length==0){
    alert('El correo es obligatorio')
    return false;
  }  
  if(!validaciones.correo.test(form.value.email)){
    alert('Correo electrónico incorrecto')
    return false;
  }  
  var telf='0'+form.value.telefono
  if(telf=='0'){
    alert('El telefono es obligatorio')
    return false;
  }  
  if(!validaciones.telefono.test(telf)){
    alert('Telefono incorrecto')
    return false;
  }  
  if(form.value.asunto.length==0){
    alert('El asunto es obligatorio')
    return false;
  }  
  if(!validaciones.asunto.test(form.value.asunto)){
    alert('Asunto incorrecto')
    return false;
  } 
  if(form.value.mensaje.length==0){
    alert('El mensaje es obligatorio')
    return false;
  }  
  if(!validaciones.mensaje.test(form.value.mensaje)){
    alert('Mensaje incorrecto')
    return false;
  } 
  return true
}
const validaciones = {
  nombre: /^([a-zA-Z]){1,80}$/,
  correo: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  telefono: /^09\d{8}$/,
  asunto: /^[a-zA-Z0-9\s,. '-]{1,20}$/,
  mensaje: /^[a-zA-Z0-9\s,. '-]{3,80}$/,
};