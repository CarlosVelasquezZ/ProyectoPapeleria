import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { PieComponent } from './components/pie/pie.component';
import { ProductoComponent } from './components/producto/producto.component';
import { AdminComponent } from './components/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordComponent } from './components/password/password.component';
import { RegistroClienteComponent } from './components/registro-cliente/registro-cliente.component';
import { RegistroProductoComponent } from './components/registro-producto/registro-producto.component';
import { ActualizarProductoComponent } from './components/actualizar-producto/actualizar-producto.component';
import { EliminarProductoComponent } from './components/eliminar-producto/eliminar-producto.component';
import { InformacionUsuarioComponent } from './components/informacion-usuario/informacion-usuario.component';
import { ProductosadminComponent } from './components/productosadmin/productosadmin.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { RecargarComponent } from './components/recargar/recargar.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [
    AppComponent,
    ContactoComponent,
    EncabezadoComponent,
    PieComponent,
    ProductoComponent,
    AdminComponent,
    HomeComponent,
    NosotrosComponent,
    LoginComponent,
    PasswordComponent,
    RegistroClienteComponent,
    RegistroProductoComponent,
    ActualizarProductoComponent,
    EliminarProductoComponent,
    InformacionUsuarioComponent,
    ProductosadminComponent,
    DetalleProductoComponent,
    RecargarComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPayPalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
