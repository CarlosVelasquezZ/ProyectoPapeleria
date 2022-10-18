import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { CargarService } from '../../services/cargar.service';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Global } from '../../services/global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr' 
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css'],
  providers: [ClienteService,CargarService]
})
export class RegistroClienteComponent implements OnInit {
  public clientes:Cliente[];
  clienteForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _clienteService:ClienteService,
    private _cargarService:CargarService
  ) { 
    this.clientes=[],
    this.clienteForm = this.fb.group({
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      cedula: ['',Validators.required],
      correo: ['',Validators.required],
      direccion: ['',Validators.required],
      telefono: ['',Validators.required],
      contrasenia: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  registrarCliente() {
    const cliente: Cliente = {
      nombre: this.clienteForm.get('nombre')?.value + " " + this.clienteForm.get('apellido')?.value,
      tipo: "cliente",
      ci: this.clienteForm.get('cedula')?.value,
      correo: this.clienteForm.get('correo')?.value,
      direccion: this.clienteForm.get('direccion')?.value,
      telefono: this.clienteForm.get('telefono')?.value,
      contrasenia: this.clienteForm.get('contrasenia')?.value,
    }

    this._clienteService.getCliente(cliente.correo).subscribe(
      response => {
        if (response.cliente) {
          alert('Ya existe un registro con es correo electronico')
        }
      },
      error => {
        if (validar(cliente)) {
          this._clienteService.guardarCliente(cliente).subscribe(data => {
            this.toastr.success('El cliente ha sido registrado con exito!', 'Cliente Registrado');
            this.router.navigate(['/inicio']);
          }, error => {
            console.log(error);
            this.clienteForm.reset();
          });
        }
      }
    );
  }
}

function validar(cliente:Cliente){
  if(!validaciones.nombre.test(cliente.nombre.toString())){
    alert('Nombre y apellido incorrecto')
    return false
  }
  if(!validarCedula(cliente.ci.toString())){
    alert("Cedula incorrecta")
    return false
  }
  if(!validaciones.correo.test(cliente.correo.toString())){
    alert('Correo electronico incorrecto')
    return false
  }
  if(!validaciones.direccion.test(cliente.direccion.toString())){
    alert('Direccion incorrecta')
    return false
  }
  var telf='0'+cliente.telefono.toString()
  if (!validaciones.telefono.test(telf)) {
    alert("Telefono incorrecto");
    return false;
  }
  var contrasenia=cliente.contrasenia.toString()
  if (!contrasenia.match(/[a-z]/g) || !contrasenia.match(/[A-Z]/g) || !contrasenia.match(/[0-9]/g) || !(contrasenia.length>7)) {
    alert("Contraseña incorrecto");
    return false;
  }
  
  return true
}
function validarCedula(cad:string){
  var longitud = cad.length;
  var longcheck = longitud - 1;
  var total = 0;
  var boolean=false
  if (longitud === 10){
    for(var i = 0; i < longcheck; i++){
      if (i%2 === 0) {
        var aux = Number(cad.charAt(i)) * 2;
        if (aux > 9) aux -= 9;
        total += aux;
      } else {
        total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
      }
    }

    total = total % 10 ? 10 - total % 10 : 0;

    if (Number(cad.charAt(longitud-1)) == total) {
      boolean=true
    }else{
      return false
    }
  }
  return boolean
}

const validaciones = {
  nombre: /^([a-zA-Z ]){1,80}$/,
  correo: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  telefono: /^09\d{8}$/,
  direccion: /^[a-zA-Z0-9\s,. '-]{3,80}$/,
};

/*npm install ngx-toastr --save*/