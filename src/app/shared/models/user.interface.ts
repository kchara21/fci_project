export type Roles = 'OPERADOR' | 'SUPERVISOR';

export interface User {
  email: string;
  clave: string;
}

export interface UserResponse extends User {
  message: string;
  token: string;
  userId: number;
  rol: Roles;
}
