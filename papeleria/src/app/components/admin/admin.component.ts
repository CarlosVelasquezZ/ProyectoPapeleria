import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var a=localStorage.getItem('recarga')
    if(a=='1'){
      window.location.reload();
      localStorage.setItem('recarga','2');
    }
  }

}
