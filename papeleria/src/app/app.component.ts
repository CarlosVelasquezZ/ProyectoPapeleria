import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'papeleria';
  ngOnInit(): void {
    if(localStorage.getItem("tipo") != undefined){
      var a=localStorage.getItem('tipo')
      if(a?.length!=0){
        if(a=='administrador'){
          $(".admin").html("ADMINISTRADOR");
        }
      }
    }
  }
}
