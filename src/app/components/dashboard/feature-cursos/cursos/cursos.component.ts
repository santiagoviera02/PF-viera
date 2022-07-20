import { DetalleCursosComponent } from './detalle-cursos/detalle-cursos.component';
import { CursosService } from './services/cursos.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cursos } from 'src/app/shared/interfaces/cursos';
import { EditarCursoComponent } from './editar-curso/editar-curso.component';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  datosUsuario: string;

  listaCursos: Cursos[];
  listaaux: Cursos[];
  admin: boolean = false;

  displayedColumns: string[] = [
    'cursoNombre',
    'cursoDias',
    'precio',
    'profesor',
    'acciones',
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _cursosService: CursosService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getCursos();
  }

  getCursos() {
    this._cursosService.getCursosList().subscribe((data) => {
      this.listaCursos = data;
      this.listaaux = data;
      localStorage.setItem('cursos', JSON.stringify(this.listaaux));
      console.log('data de cursoslocal');
      console.log(this.listaCursos);
    });
  }

  openDialog2(curso: Cursos) {
    const dialogRef = this.dialog.open(DetalleCursosComponent, {
      width: '600px',
      height: '600px',
      panelClass: 'makeItMiddle',
      data: {
        idCurso: curso.idCurso,
        cursoNombre: curso.cursoNombre,
        cursoDias: curso.cursoDias,
        precio: curso.precio,
        profesor: curso.profesor,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.router.navigate(['dashboard/cursos']);
    });
  }

  openDialog(curso: Cursos) {
    const dialogRef = this.dialog.open(EditarCursoComponent, {
      width: '1000px',
      panelClass: 'makeItMiddle',
      data: {
        idCurso: curso.idCurso,
        cursoNombre: curso.cursoNombre,
        cursoDias: curso.cursoDias,
        precio: curso.precio,
        profesor: curso.profesor,

      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this._cursosService.updateCursoSer(result).subscribe(() => {
        // this.store.dispatch(cargarAlumnos());
      });
    });
  }

  getCursoDetails(idCurso: number) {
    this._cursosService.getSingleCurso(idCurso).subscribe((data) => {
      console.log(data);
    });
  }

  deleteCurso(idCurso: number) {
    this._cursosService.deleteCurso(idCurso).subscribe((data) => {
      this.getCursos();
    });
  }
}
