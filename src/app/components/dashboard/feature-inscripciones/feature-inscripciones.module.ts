import { EditarInscripcionComponent } from './editar-inscripcion/editar-inscripcion.component';
import { CrearInscripcionComponent } from './crear-inscripcion/crear-inscripcion.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { DetalleInscripcionesComponent } from './detalle-inscripciones/detalle-inscripciones.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    MaterialModule,
    RouterModule
  ]
})
export class FeatureInscripcionesModule { }
