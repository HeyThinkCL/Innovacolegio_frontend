/**
 * Created by matias on 21-12-16.
 */
import { Pipe, PipeTransform } from '@angular/core';

import { Curso } from '../components/libros/cursos/curso'

@Pipe({ name: 'filterCursosProf' })
export class FilterCursoProf implements PipeTransform {
  transform(allCursos: Curso[]) {
    return allCursos.filter(curso => curso.profesor == null );
  }
}
