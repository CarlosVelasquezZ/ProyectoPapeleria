import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { Router } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  constructor(
    private _router:Router
  ) { }

  ngOnInit(): void {
    var tipo=localStorage.getItem('tipo');
    var nombre=localStorage.getItem('nombre')
    if(tipo=='administrador' || tipo=='cliente'){
      $(".dato").html("<input type='submit' style='font-size: 10px; margin-top: 20px;' value='"+nombre+"'>"+
      "<input type='submit' ngModel value='Cerrar Sesión' style='font-size: 10px; margin-top: 10px;'>");
    }
  }
  cerrar(){
    //window.location.reload()
    localStorage.setItem('recarga','1');
    localStorage.setItem('tipo','');
    localStorage.setItem('nombre','');
    this._router.navigate(['/recargar'])
    //window.location.reload()
  }

}
