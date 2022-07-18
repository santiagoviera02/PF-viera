import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { UsuarioState } from 'src/app/shared/models/usuario.state';
import * as UsuariosActions from './usuarios.actions';

export const usuariosFeatureKey = 'usuarios';

export interface State {
  cargando: boolean;
  cursos: Usuario[];
}

export const initialState: UsuarioState = {
  cargando: false,
  usuarios: [],
};

export const usuarioReducer = createReducer(
  initialState,
  on(UsuariosActions.cargarUsuarios, (state) => {
    return { ...state, cargando: true };
  }),
  on(UsuariosActions.usuariosCargados, (state, { usuarios }) => {
    return { ...state, cargando: false, usuarios };
  })
);
