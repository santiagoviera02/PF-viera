import { MaterialModule } from 'src/app/components/material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Cursos } from 'src/app/shared/interfaces/cursos';
import { EstudiantesLista } from 'src/app/shared/interfaces/estudiantes';
import { Router } from '@angular/router';
import { ListaEstudiantesService } from '../services/listaEstudiantes.service';
import { EditarEstudianteComponent } from './editar-estudiante/editar-estudiante.component';
import { DetalleComponent } from '../estudiantes/detalle/detalle.component';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { InscripcionesService } from '../../feature-inscripciones/services/inscripciones.service';

@Component({
  selector: 'app-lista-estudiantes',
  templateUrl: './listaEstudiantes.component.html',
  styleUrls: ['./listaEstudiantes.component.scss'],
})
export class ListaEstudiantesComponent implements OnInit {
  listaux: EstudiantesLista[];
  lista: EstudiantesLista[];

  admin: boolean = true;
  datosUsuario: string;

  listaCursos: Cursos[] = [];
  // listaEstudiantes: EstudiantesLista[] = [];

  displayedColumns: string[] = [
    'nombre',
    'edad',
    'correo',
    'telefono',
    'acciones',
  ];

  constructor(
    public authService: AuthService,
    private _estudiantesListaService: ListaEstudiantesService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private estudiantesService: EstudiantesService,
    public dialog: MatDialog,
    private inscripcionesService: InscripcionesService
  ) {}

  ngOnInit(): void {
    this.getEstudiantes();
  }

  getEstudiantes() {
    this._estudiantesListaService.getEstudiantesList().subscribe((data) => {
      this.lista = data;
      this.listaux = data;
      localStorage.setItem('estudiantes', JSON.stringify(this.listaux));

      console.log('Estudiantes');
      console.log(this.lista);
    });
  }

  openDialog2(estudiante: EstudiantesLista) {
    const dialogRef = this.dialog.open(DetalleComponent, {
      width: '600px',
      height: '600px',
      panelClass: 'makeItMiddle',
      data: {
        idEstudiante: estudiante.idEstudiante,
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
        edad: estudiante.edad,
        correo: estudiante.correo,
        telefono: estudiante.telefono,
        cursos: this.inscripcionesService.getInscripcionesList(),
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.router.navigate(['dashboard/estudiantes']);
    });
  }

  openDialog(estudiante: EstudiantesLista) {
    const dialogRef = this.dialog.open(EditarEstudianteComponent, {
      width: '1000px',
      panelClass: 'makeItMiddle',
      data: {
        idEstudiante: estudiante.idEstudiante,
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
        edad: estudiante.edad,
        correo: estudiante.correo,
        telefono: estudiante.telefono,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this._estudiantesListaService
        .updateEstudianteSer(result)
        .subscribe(() => {
          // this.store.dispatch(cargarAlumnos());
        });
    });
  }

  getEstudianteDetails(idEstudiante: number) {
    this._estudiantesListaService
      .getSingleStudent(idEstudiante)
      .subscribe((data) => {
        console.log(data);
      });
  }

  deleteEstudiante(idEstudiante: number) {
    this._estudiantesListaService
      .deleteEstudiante(idEstudiante)
      .subscribe((data) => {
        this.getEstudiantes();
      });
  }
}
