import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstudiantesLista } from 'src/app/shared/interfaces/estudiantes';
import { CrearListaEstudiantesComponent } from '../crear-lista-estudiantes/crear-lista-estudiantes.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CursosService } from '../../../feature-cursos/cursos/services/cursos.service';
import { Cursos } from 'src/app/shared/interfaces/cursos';
import { InscripcionesService } from '../../../feature-inscripciones/services/inscripciones.service';
import { Observable, Subscription } from 'rxjs';
import { Inscripciones } from 'src/app/shared/interfaces/inscripciones';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-delle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  detalle: EstudiantesLista;
  value: any = null;
  form: FormGroup;
  cursitos: Cursos[] = [];

  dataSource: any;
  usuario: any;
  auxCurso: any;

  displayedColumns: string[] = ['cursoNombre'];

  alumnSubscription!: Subscription;

  detalleDeCursos$!: Observable<Inscripciones[]>;
  store: any;

  constructor(
    public dialogRef: MatDialogRef<CrearListaEstudiantesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EstudiantesLista,
    private router: Router,
    public authService: AuthService,
    private fb: FormBuilder,
    private cursosService: CursosService,
    private inscripcionesService: InscripcionesService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state;
  }

  ngOnInit(): void {
    this.cursitos = [];
    this.inicializar(this.data);
    console.log('cursos');
    console.log(this.cursitos);
    //  this.cursosService.getCursosList().subscribe((res: any) => {
    //   this.auxCurso = res;
    // });
  }

  inicializar(estudiante: EstudiantesLista) {
    this.auxCurso = this.inscripcionesService.misCursos(
      estudiante.idEstudiante
    );
    this.form = this.fb.group({
      idEstudiante: estudiante.nombre + ' ' + estudiante.apellido,
      edad: estudiante.edad,
      correo: estudiante.correo,
      telefono: estudiante.telefono,
      cursos: this.cursitos,
    });
  }

  cerrar() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
