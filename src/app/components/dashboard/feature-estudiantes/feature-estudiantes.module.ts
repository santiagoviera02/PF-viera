
import { ListaEstudiantesComponent } from 'src/app/components/dashboard/feature-estudiantes/estudiantes/listaEstudiantes.component';
import { DetalleComponent } from './estudiantes/detalle/detalle.component';
import { CrearListaEstudiantesComponent } from './estudiantes/crear-lista-estudiantes/crear-lista-estudiantes.component';
import { EditarEstudianteComponent } from './estudiantes/editar-estudiante/editar-estudiante.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NombreCursoPipeModule } from 'src/app/shared/pipes/nombre-curso.pipe';
import { NombreEstudiantePipeModule } from 'src/app/shared/pipes/nombre-estudiante.pipe';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MaterialModule,
    NombreCursoPipeModule,
    NombreEstudiantePipeModule,
    RouterModule,
  ],
  exports: [
    MaterialModule,
    RouterModule,

   ]
})
export class FeatureEstudiantesModule { }
