import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// * COMPONENTS
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { UsuarioGuardService } from './guards/usuario-guard.service';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'mensajes',
    component: MensajesComponent,
    canActivate: [ UsuarioGuardService ]
  },
  {path: '**', component: LoginComponent},

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot( appRoutes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
