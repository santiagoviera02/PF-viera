import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  logueado!: any;

  usuarioSubject = new Subject<any>();
  URL_SERVICIOS = environment.URL_SERVICIOS;

  constructor(private http: HttpClient) { }

  obtenerDatos(): Observable<any> {
    return this.http.get(`${environment.URL_SERVICIOS}/login`);
  }

  agregarUsuarios(usuario: any) {
    return this.http
      .post(`${environment.URL_SERVICIOS}/login`, usuario)
      .pipe(
        tap({
          next: () => this.usuarioSubject.next(usuario),
        })
      );
  }

  editarUsuario(usuario: any) {
    return this.http
      .put(
        `${environment.URL_SERVICIOS}/login/${usuario.idUsuario}`,
        usuario
      )
      .pipe(
        tap({
          next: () => this.usuarioSubject.next(usuario),
        })
      );
  }

  eliminarUsuario(usuario: any) {
    return this.http
      .delete(
        `${environment.URL_SERVICIOS}/login/${usuario.idUsuario}`,
        usuario
      )
      .pipe(
        tap({
          next: () => this.usuarioSubject.next(usuario),
        })
      );
  }
}
