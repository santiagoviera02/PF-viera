import { EstudiantesLista } from 'src/app/shared/interfaces/estudiantes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject, tap } from 'rxjs';

import { Inscripciones } from 'src/app/shared/interfaces/inscripciones';

@Injectable({
  providedIn: 'root',
})
export class ListaEstudiantesService {
  inscripcionSubject = new Subject<any>();

  listaEstudiantes =
    'https://62b5c8e542c6473c4b3a479f.mockapi.io/lista';

  constructor(private http: HttpClient) { }

  alumnoSubject = new Subject<any>();

  getEstudiantesList(): Observable<EstudiantesLista[]> {
    return this.http.get<EstudiantesLista[]>(this.listaEstudiantes);
  }

  getSingleStudent(idEstudiante: any): Observable<EstudiantesLista> {
    return this.http.get<EstudiantesLista>(
      this.listaEstudiantes + idEstudiante
    );
  }

  createEstudiante(estudiante: EstudiantesLista): Observable<EstudiantesLista> {
    var response: any;
    response = this.http
      .post<EstudiantesLista>(this.listaEstudiantes, estudiante)
      .subscribe((data) => {
        return data;
      });
    return response;
  }

  deleteEstudiante(idEstudiante: number): Observable<EstudiantesLista> {
    return this.http.delete<EstudiantesLista>(
      this.listaEstudiantes + idEstudiante
    );
  }

  updateEstudianteSer(
    estudiante: EstudiantesLista
  ): Observable<EstudiantesLista> {
    var response: any;
    response = this.http
      .put<EstudiantesLista>(
        this.listaEstudiantes + estudiante.idEstudiante,
        estudiante
      )
      .subscribe((data) => {
        console.log('data');
        console.log(data);
        return data;
      });
    return response;
  }
}
