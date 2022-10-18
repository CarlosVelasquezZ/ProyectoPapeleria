import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Global } from '../../services/global';
import { Producto } from '../../models/producto';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest, IPurchaseUnit } from 'ngx-paypal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [ProductoService]
})
export class CarritoComponent implements OnInit {
  public productos:Producto[];
  public url:String;
  public control:Boolean;
  public cantidad:string[];
  public total:string[];
  public totalPago:number;

  public payPalConfig ? : IPayPalConfig;
  showSuccess: boolean | undefined;
  
  constructor(
    private _productoService:ProductoService,
    private _router:Router,
    private _route:ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.url = Global.url;
    this.productos = [];
    this.control = false;
    this.cantidad = [];
    this.total = [];
    this.totalPago = 0;
   }

  ngOnInit(): void {
    var a=localStorage.getItem('recarga')
    if(a=='1'){
      window.location.reload();
      localStorage.setItem('recarga','2');
    }else{
      if (localStorage.getItem('tipo') != 'administrador') {
        //Inicializar los productos del carrito
        this.productos = [];
        this.cantidad = [];
        var objetos = JSON.parse(localStorage.getItem('productoCarrito') || '{}');
        if (Object.entries(objetos).length > 0) {
          for (var i in objetos) {
            var data = JSON.parse(objetos[i]);
            this.getProductosCarrito(data.producto, data.cantidad);
          }
        } else {
          this._router.navigate(["/productos"]);
        }
      }
      else {
        alert('Acceso denegado, solo clientes pueden acceder al carrito')
        this._router.navigate(['/admin']);
      }
    }

    
  }


  getProductosCarrito(id:string, cantidad:string){
    this._productoService.getProductos().subscribe(
      response=>{
        if(response.productos){
          for (let producto of response.productos){
            if(producto._id == id){
              this.cantidad.push(cantidad);
              this.productos.push(producto); 
              let tot = (parseFloat(cantidad)*producto.precio).toFixed(2);
              let tot2 = (parseFloat(cantidad)*producto.precio)
              var rounded = Math.round((tot2 + Number.EPSILON) * 100) / 100;
              this.totalPago += rounded;
              this.total.push(tot.toString());
            }
          }
          this.totalPago = parseFloat(this.totalPago.toFixed(2));
        }
      },
      error=>{
        console.log(<any>error);
      }

    );
  }

  eliminar(id:string){
    var objetos = JSON.parse(localStorage.getItem('productoCarrito') || '{}');

    for(var i in objetos){
      var data = JSON.parse(objetos[i]);
      if(data.producto == id){
        var unicos = objetos.filter((item: { producto: any; }) => item !== objetos[i]);
        localStorage.setItem("productoCarrito", JSON.stringify(unicos));
        this._router.navigate(["/carrito"]);
        this.recargarCantidad();
        location.reload();
      }
    } 
  }

  eliminarAumentar(id:string){
    var objetos = JSON.parse(localStorage.getItem('productoCarrito') || '{}');

    for(var i in objetos){
      var data = JSON.parse(objetos[i]);
      if(data.producto == id){
        var unicos = objetos.filter((item: { producto: any; }) => item !== objetos[i]);
        console.log(unicos);
        localStorage.setItem("productoCarrito", JSON.stringify(unicos));
        this.recargarCantidad();
      }
    }
  }

  recargarCantidad(){
    this.productos = [];
    this.cantidad = [];
    var objetos = JSON.parse(localStorage.getItem('productoCarrito') || '{}');
    if(Object.entries(objetos).length > 0){
      for(var i in objetos){
        var data = JSON.parse(objetos[i]);
        this.getProductosCarrito(data.producto, data.cantidad);
      } 
    }else{
      this._router.navigate(["/productos"]);
    }
  }

  aumentar(form:NgForm, id:string, k:number, stock:string){
    //verificar
    if(form.value.mas >=1 && form.value.mas<=stock){
        //eliminar 
      this.eliminarAumentar(id);
      var objetos = JSON.parse(localStorage.getItem('productoCarrito') || '{}');
      //datos a ingresar
      let mi_objeto={producto:id, cantidad:form.value.mas};
      console.log(mi_objeto);
      //ingresar datos
      objetos.push(JSON.stringify(mi_objeto));
      //Guardar en localStorage
      localStorage.setItem("productoCarrito",JSON.stringify(objetos));
      //recargar pagina
      this.recargarCantidad();
      window.location.reload();
    }else{
      if(form.value>=stock){
        alert("Stock no disponible, Ingrese un numero");
        window.location.reload();
      }
    }
  }


  pago(total:number){
    if(localStorage.getItem('tipo')!=undefined){
      if(localStorage.getItem('tipo')=='cliente'){
        this.control = true;
        localStorage.setItem("total", total.toString());
        this.initConfig();
      }
      else{
        alert('Debe iniciar sesion')
        localStorage.setItem('paginaActual','1')
        this._router.navigate(["/login"]);
      }
    }
    else{
      alert('Debe iniciar sesion')
      localStorage.setItem('paginaActual','1')
      this._router.navigate(["/login"]);
    }
    

  }

    
  //paypal
  private initConfig(): void {
    let tot = localStorage.getItem("total");
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: tot,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: tot
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: tot,
                },
              }
            ]
          }
        ]
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
        //alert("Pago realizado");
        this.toastr.success('Pago realizado', 'Gracias por su Compra');

        //funciones limpieza
        //cambiar stock productos
        this.cambiarStock();

        localStorage.removeItem("productoCarrito");
        localStorage.removeItem("total");

        this._router.navigate(["/inicio"]);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: () => {
        console.log('onClick');
      },
    };
  }

  cambiarStock(){
    //traer los productos del local storage
    let prod:Producto;
    prod=new Producto('','','','','','','','');
    this.productos = [];
    this.cantidad = [];
    var objetos = JSON.parse(localStorage.getItem('productoCarrito') || '{}');
    if(Object.entries(objetos).length > 0){
      for(var i in objetos){
        var data = JSON.parse(objetos[i]);
        this.devolverProducto(data.producto, data.cantidad);
      } 
    }
    console.log(this.productos)
  }

  devolverProducto(id:string, cantidad:string){
    let prod:Producto;
    prod=new Producto('','','','','','','','');
    this._productoService.getProducto(id).subscribe(
      response=>{
        prod=response.producto;
        //Actualizar stock de Producto
        let aux = prod.stock;
        aux = (parseInt(aux)-parseInt(cantidad)).toString();
        prod['stock'] = aux;
        //Actualizar Producto
        this._productoService.updateProducto(prod).subscribe(
          response => {
            if(response.productos){
              //alert("Actualizacion completada");
            }
          },error=>{
            console.log(<any>error);
          }
        )
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
}
