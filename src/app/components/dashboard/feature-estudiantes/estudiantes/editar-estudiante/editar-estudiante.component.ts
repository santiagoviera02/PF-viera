import { ListaEstudiantesService } from '../../services/listaEstudiantes.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstudiantesLista } from 'src/app/shared/interfaces/estudiantes';
import { CrearListaEstudiantesComponent } from '../crear-lista-estudiantes/crear-lista-estudiantes.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/components/material/material.module';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';

@Component({
  selector: 'app-editar-estudiante',
  templateUrl: './editar-estudiante.component.html',
  styleUrls: ['./editar-estudiante.component.scss'],
})
export class EditarEstudianteComponent implements OnInit {
  form: FormGroup;
  value: any = null;

  constructor(
    public dialogRef: MatDialogRef<CrearListaEstudiantesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EstudiantesLista,
    private fb: FormBuilder,
    private _estudiantesService: ListaEstudiantesService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state;
  }

  ngOnInit(): void {
    this.inicializar(this.data);
    this._estudiantesService.getEstudiantesList();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  inicializar(estudiante: EstudiantesLista) {
    this.form = this.fb.group({
      idEstudiante: [''],
      nombre: ['', [Validators.required, Validators.maxLength(10)]],
      apellido: ['', [Validators.required, Validators.maxLength(10)]],
      edad: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
    console.log(this.form);
    this.form.get('idEstudiante')?.patchValue(estudiante.idEstudiante);
    this.form.get('nombre')?.patchValue(estudiante.nombre);
    this.form.get('apellido')?.patchValue(estudiante.apellido);
    this.form.get('edad')?.patchValue(estudiante.edad);
    this.form.get('correo')?.patchValue(estudiante.correo);
    this.form.get('telefono')?.patchValue(estudiante.telefono);
  }

  updateEstudiante(estudianteForm: FormGroup) {
    var estudianteToUpdate: EstudiantesLista = {
      idEstudiante: estudianteForm.value.idEstudiante,
      nombre: estudianteForm.value.nombre,
      apellido: estudianteForm.value.apellido,
      edad: estudianteForm.value.edad,
      correo: estudianteForm.value.correo,
      telefono: estudianteForm.value.telefono,
    };
    console.log('UPDATE');
    console.log(estudianteToUpdate);

    this._estudiantesService.updateEstudianteSer(estudianteToUpdate);
    this._estudiantesService.getEstudiantesList();

    this.router.navigate(['/dashboard/estudiantes']);
    this._snackBar.open('Estudiante editado exitosamente', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1500,
    });
    this.dialogRef.close();
  }

  volver() {
    this.router.navigate(['/dashboard/estudiantes']);
    this.dialogRef.close();
    console.log(this.form.value);
  }
}
