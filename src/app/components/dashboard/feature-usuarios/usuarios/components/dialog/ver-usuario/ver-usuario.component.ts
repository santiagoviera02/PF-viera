import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/shared/interfaces/usuario';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css'],
})
export class VerUsuarioComponent {
  dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<VerUsuarioComponent>,
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
