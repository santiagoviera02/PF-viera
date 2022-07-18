import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/shared/interfaces/usuario';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css'],
})
export class EliminarUsuarioComponent {
  dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<EliminarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    public fb: FormBuilder
  ) {}

  formControl = new FormControl('', [Validators.required]);

  getError() {
    return this.formControl.hasError('required') ? 'El campo es requerido' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
