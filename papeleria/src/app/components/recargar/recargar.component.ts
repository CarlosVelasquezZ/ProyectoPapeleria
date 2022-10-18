import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recargar',
  templateUrl: './recargar.component.html',
  styleUrls: ['./recargar.component.css']
})
export class RecargarComponent implements OnInit {

  constructor(
    private _router:Router
  ) { }

  ngOnInit(): void {
    this._router.navigate(['/inicio'])
  }

}
