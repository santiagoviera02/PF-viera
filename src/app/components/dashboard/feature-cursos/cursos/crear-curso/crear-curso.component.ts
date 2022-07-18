import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Cursos } from 'src/app/shared/interfaces/cursos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Inject } from '@angular/core';
import { CursosService } from '../services/cursos.service';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.scss'],
})
export class CrearCursoComponent implements OnInit {
  form: FormGroup;
  value: any = null;

  constructor(
    private fb: FormBuilder,
    private _cursosService: CursosService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state;

    this.form = this.fb.group({
      id: [''],
      cursoNombre: ['', [Validators.required, Validators.maxLength(40)]],
      cursoDias: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      profesor: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  guardar() {
    const curso: Cursos = {
      idCurso: this.form.value.idCurso,
      cursoNombre: this.form.value.cursoNombre,
      cursoDias: this.form.value.cursoDias,
      precio: this.form.value.precio,
      profesor: this.form.value.profesor,
      detalle: this.form.value.detalle,
    };

    this._cursosService.createCurso(curso);
    this.router.navigate(['/dashboard/cursos']);
    this._snackBar.open('Curso agregado exitosamente', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1500,
    });
    this.form.reset();
  }
  volver() {
    this.router.navigate(['/dashboard/cursos']);
    console.log(this.form.value);
  }
}
