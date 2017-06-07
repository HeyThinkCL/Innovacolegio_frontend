/**
 * Created by matias on 05-12-16.
 */
import { OnInit } from '@angular/core';

export class Usuario{
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  rut: number;
  dv: string;
  fono_casa: string;
  fono_movil: string;
  email: string;
  sexo: string;
  nacionalidad: string;
  estado_civil: string;
  fecha_nacimiento: string;

  constructor(){}
}

export class Alumno{
  aceptado: boolean;
  desiste: boolean;
  lista_espera: boolean;
  rechazado: boolean;
  promovido: boolean;
  matriculado: boolean;
  prioritario: boolean;
  vulnerable: boolean;
  preferente: boolean;
  pie: boolean;
  intercambio: boolean;
  excedente: boolean;
  lista: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  rut: number;
  dv: string;
  pasaporte: string;
  etnia: string;
  fono_casa: string;
  fono_movil: string;
  email: string;
  sexo: string;
  nacionalidad: string;
  fecha_nacimiento: string;

  constructor(public postulante: boolean){}
}

export class Apoderado{
  ocupacion: string;
  titulo: string;
  usuario: Usuario;

  constructor(public padre: boolean, public madre: boolean, public apoderado: boolean){
    this.usuario = new Usuario;
  }
}
