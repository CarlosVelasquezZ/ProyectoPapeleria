import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarProductoComponent } from './components/actualizar-producto/actualizar-producto.component';
import { AdminComponent } from './components/admin/admin.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { EliminarProductoComponent } from './components/eliminar-producto/eliminar-producto.component';
import { HomeComponent } from './components/home/home.component';
import { InformacionUsuarioComponent } from './components/informacion-usuario/informacion-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { PasswordComponent } from './components/password/password.component';
import { ProductosadminComponent } from './components/productosadmin/productosadmin.component';
import { ProductoComponent } from './components/producto/producto.component';
import { RegistroClienteComponent } from './components/registro-cliente/registro-cliente.component';
import { RegistroProductoComponent } from './components/registro-producto/registro-producto.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { RecargarComponent } from './components/recargar/recargar.component';
import { CarritoComponent } from './components/carrito/carrito.component';

const routes: Routes = [
  {path:'inicio',component:HomeComponent},
  {path:'quienes-somos',component:NosotrosComponent},
  {path:'contacto',component:ContactoComponent},
  {path:'login',component:LoginComponent},
  {path:'recuperar-contraseña',component:PasswordComponent},
  {path:'registrarse',component:RegistroClienteComponent},
  {path:'admin',component:AdminComponent},
  {path:'registar-producto',component:RegistroProductoComponent},
  {path:'eliminar-producto/:id',component:EliminarProductoComponent},
  {path:'modificar-producto/:id',component:ActualizarProductoComponent},
  {path:'informacion',component:InformacionUsuarioComponent},
  {path:'productosAdmin',component:ProductosadminComponent},
  {path:'productos',component:ProductoComponent},
  {path:'productos/:categoria',component:ProductoComponent},
  {path:'producto/:id',component:DetalleProductoComponent},
  {path:'encabezado',component:EncabezadoComponent},
  {path:'recargar',component:RecargarComponent},
  {path:'carrito',component:CarritoComponent},
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
