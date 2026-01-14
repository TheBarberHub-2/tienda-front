import { Rol } from '../../enums/rol.enum';

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
}
