import { ActionReducerMap } from '@ngrx/store';

import { usuarioReducer } from './state/usuarios.reducer';

export interface AppState {
  usuarios: UsuarioState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  usuarios: usuarioReducer,
};
