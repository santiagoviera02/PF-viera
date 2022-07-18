import { InscripcionesService } from '../services/inscripciones.service';
import { DetalleInscripcionesComponent } from '../detalle-inscripciones/detalle-inscripciones.component';
import { NavigationExtras, Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Inscripciones } from 'src/app/shared/interfaces/inscripciones';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EditarEstudianteComponent } from '../../feature-estudiantes/estudiantes/editar-estudiante/editar-estudiante.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditarInscripcionComponent } from '../editar-inscripcion/editar-inscripcion.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { cargarInscripciones } from './inscripciones.actions';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss'],
})
export class InscripcionesComponent implements OnInit {
  datosUsuario: string;
  registration: any;
  listaInscripciones: Inscripciones[];

  admin: boolean = false;

  public courseDetails: any;

  public detailsData: MatTableDataSource<any>;
  inscripcionesDetalles = [];

  displayedColumns: string[] = [
    'idInscripcion',
    'idEstudiante',
    'idCurso',
    'acciones',
  ];

  subscriptions: Subscription;
  registrations: any;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _inscripcionesService: InscripcionesService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private store: Store,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getInscripciones();

    // this.subscriptions.add(
    //   this._inscripcionesService.getInscripcionesList().subscribe(

    //     (val)=>this.registration=val

    //   )
    // )
  }

  getInscripciones() {
    this._inscripcionesService.getInscripcionesList().subscribe((data) => {
      this.listaInscripciones = data;

      console.log('inscripciones st');
      console.log(this.listaInscripciones);
      localStorage.setItem('inscripciones', JSON.stringify(data));
    });
  }

  openDialog2(inscripcion: Inscripciones) {
    const dialogRef = this.dialog.open(DetalleInscripcionesComponent, {
      width: '600px',
      height: '600px',
      panelClass: 'makeItMiddle',
      data: {
        idInscripcion: inscripcion.idInscripcion,
        idEstudiante: inscripcion.idEstudiante,
        idCurso: inscripcion.idCurso,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.router.navigate(['dashboard/inscripciones']);
    });
  }

  // openDialog(inscripcion: Inscripciones) {
  //   const dialogRef = this.dialog.open(EditarInscripcionComponent, {
  //     width: '1000px',
  //     panelClass: 'makeItMiddle',
  //     data: {
  //       nombre: inscripcion.nombre,
  //       curso: inscripcion.cursoNombre
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     this._inscripcionesService.updateInscripcionSer(result).subscribe(() => {
  //       // this.store.dispatch(cargarAlumnos());
  //     });
  //   });
  // }

  openDialog(inscripcion: Inscripciones) {
    const dialogRef = this.dialog.open(EditarInscripcionComponent, {
      width: '1000px',
      panelClass: 'makeItMiddle',
      data: {
        idInscripcion: inscripcion.idInscripcion,
        idEstudiante: inscripcion.idEstudiante,
        idCurso: inscripcion.idCurso,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        this.router.navigate(['dashboard/inscripciones']);
        this._inscripcionesService.updateInscripcionSer(result);
        this.getInscripciones();
      }
    });
  }

  getInscripcionDetails(idInscripcion: number) {
    this._inscripcionesService
      .getSingleInscripcion(idInscripcion)
      .subscribe((data) => {
        console.log(data);
      });
  }

  deleteInscripcion(idInscripcion: number) {
    this._inscripcionesService
      .deleteInscripcion(idInscripcion)
      .subscribe((data) => {
        this.getInscripciones();
      });
  }
}
