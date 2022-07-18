import { Usuario } from "../interfaces/usuario";

export interface UsuarioState {
  cargando: boolean;
  usuarios: Usuario[];
}
