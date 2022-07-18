import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './components/dialog/editar-usuario/editar-usuario.component';
import { VerUsuarioComponent } from './components/dialog/ver-usuario/ver-usuario.component';
import { EliminarUsuarioComponent } from './components/dialog/eliminar-usuario/eliminar-usuario.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { EffectsModule } from '@ngrx/effects';
import { UsuariosEffects } from './state/usuarios.effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { usuarioReducer, usuariosFeatureKey } from './state/usuarios.reducer';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/components/material/material.module';
import { DashboardUsuariosComponent } from './components/dashboard-usuarios/dashboard-usuarios.component';


@NgModule({
  declarations: [
    EditarUsuarioComponent,
    VerUsuarioComponent,
    EliminarUsuarioComponent,
    FormUsuarioComponent,
    DashboardUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature(usuariosFeatureKey, usuarioReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      name: '',
    }),
    EffectsModule.forFeature([UsuariosEffects]),
  ],
})
export class UsuariosModule { }
