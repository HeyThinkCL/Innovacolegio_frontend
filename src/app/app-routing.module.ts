import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RootComponent } from './root.component';

import { AppComponent } from './app.component';
//guards
import {AuthGuard,AuthGuardChild} from './guards/auth.guard';
import {ConfigCalendarioAcademicoGuard} from './guards/config-guards/config-calendario-academico.guard';
import {AdministradorGuard,AdministradorGuardChild} from './guards/sesion-guards/administrador.guard';
import {ConfiguracionesGuard,ConfiguracionesGuardChild} from './guards/sesion-guards/configuraciones.guard';
import {DigitadorGuard,DigitadorGuardChild} from './guards/sesion-guards/digitador.guard';
import {SostenedorGuard,SostenedorGuardChild} from './guards/sesion-guards/sostenedor.guard';

import {ScriptsGuard, ScriptsGuardChild} from './guards/scripts.guard';
//Login
import { LoginComponent } from './components/login/login.component';
import { SostenedorAfterLoginComponent } from './components/login/sostenedor-after-login/sostenedor-after-login.component';
//Misc
import { NotFoundComponent } from './components/misc/not-found/not-found.component';
import { ForbiddenComponent } from './components/misc/forbidden/forbidden.component';
import { ServerErrorComponent } from './components/misc/server-error/server-error.component';
import { AlertaConfigComponent } from './components/misc/alerta-config/alerta-config.component';

//Dashboard
import { DashboardComponent } from './components/dashboard/dashboard.component';

//Sistema
////Colegios
import { ColegiosComponent } from './components/sistema/colegios/colegios.component';
import { CrearColegioComponent } from './components/sistema/colegios/crear-colegio/crear-colegio.component';
import { EditarColegioComponent } from './components/sistema/colegios/editar-colegio/editar-colegio.component';
import { VerColegioComponent } from './components/sistema/colegios/ver-colegio/ver-colegio.component';
import { ColegioDetailComponent } from './components/sistema/colegios/colegio-detail/colegio-detail.component';
////Matriculas
import { MatriculaComponent } from './components/sistema/matricula/matricula.component';
import { CrearMatriculaComponent } from './components/sistema/matricula/crear-matricula/crear-matricula.component';
import { EditarMatriculaComponent } from './components/sistema/matricula/editar-matricula/editar-matricula.component';
import { VerMatriculaComponent } from './components/sistema/matricula/ver-matricula/ver-matricula.component';
import { MatriculaDetailComponent } from './components/sistema/matricula/matricula-detail/matricula-detail.component';
////Postulaciones
import { PostulacionesComponent } from './components/sistema/postulaciones/postulaciones.component';
import { PostulacionDetailComponent } from './components/sistema/postulaciones/postulacion-detail/postulacion-detail.component';
import { CrearPostulacionComponent } from './components/sistema/postulaciones/crear-postulacion/crear-postulacion.component';
import { ModificarPostulacionComponent } from './components/sistema/postulaciones/modificar-postulacion/modificar-postulacion.component';
import { PostulacionesDashboardComponent } from './components/sistema/postulaciones/postulaciones-dashboard/postulaciones-dashboard.component';
import { VerPostulacionesComponent } from './components/sistema/postulaciones/ver-postulaciones/ver-postulaciones.component';
import { PostulacionesAceptadasComponent } from './components/sistema/postulaciones/postulaciones-aceptadas/postulaciones-aceptadas.component';
import { PostulacionesRechazadasComponent } from './components/sistema/postulaciones/postulaciones-rechazadas/postulaciones-rechazadas.component';
import { PostulacionesEsperaComponent } from './components/sistema/postulaciones/postulaciones-espera/postulaciones-espera.component';

//Libros
import { CursosComponent } from './components/libros/cursos/cursos.component';
import { CrearCursoComponent } from './components/libros/cursos/crear-curso/crear-curso.component';
import { VerCursoComponent } from './components/libros/cursos/ver-curso/ver-curso.component';
import { ModificarCursoComponent } from './components/libros/cursos/modificar-curso/modificar-curso.component';
import { CursoDetailComponent } from './components/libros/cursos/curso-detail/curso-detail.component';
////Lista
import { CursoListaComponent } from './components/libros/cursos/curso-lista/curso-lista.component';
////Notas
import { CursoNotasComponent } from './components/libros/cursos/curso-notas/curso-notas.component';
import { CursoNotasVerComponent } from './components/libros/cursos/curso-notas/curso-notas-ver/curso-notas-ver.component';
import { CursoNotasIngresarComponent } from './components/libros/cursos/curso-notas/curso-notas-ingresar/curso-notas-ingresar.component';
////Asistencia
import { CursoAsistenciaComponent } from './components/libros/cursos/curso-asistencia/curso-asistencia.component';
import { CursoAsistenciaVerComponent } from './components/libros/cursos/curso-asistencia/curso-asistencia-ver/curso-asistencia-ver.component';
import { CursoAsistenciaIngresarComponent } from './components/libros/cursos/curso-asistencia/curso-asistencia-ingresar/curso-asistencia-ingresar.component';
////Anotaciones
import { CursoAnotacionesComponent } from './components/libros/cursos/curso-anotaciones/curso-anotaciones.component';
import { CursoAnotacionesVerComponent } from './components/libros/cursos/curso-anotaciones/curso-anotaciones-ver/curso-anotaciones-ver.component';
import { CursoAnotacionesIngresarComponent } from './components/libros/cursos/curso-anotaciones/curso-anotaciones-ingresar/curso-anotaciones-ingresar.component';
import { CursoAnotacionesVerGenComponent } from './components/libros/cursos/curso-anotaciones/curso-anotaciones-ver-gen/curso-anotaciones-ver-gen.component';
////Asignar Profesor
import { AsignarProfesorACursoComponent } from './components/libros/cursos/asignar-profesor-a-curso/asignar-profesor-a-curso.component';
//Cierre de Año
import { CierreAnnoComponent } from './components/cierre-anno/cierre-anno.component';

//Profesor
import { ProfesoresComponent } from './components/libros/profesores/profesores.component';
import { VerProfesoresComponent } from './components/libros/profesores/ver-profesores/ver-profesores.component';
import { AsignarProfesorComponent } from './components/libros/profesores/asignar-profesor/asignar-profesor.component';

//Asignaturas
import { AsignaturasComponent } from './components/libros/asignaturas/asignaturas.component';
import { VerAsignaturasComponent } from './components/libros/asignaturas/ver-asignaturas/ver-asignaturas.component';
import { ModificarAsignaturaComponent } from './components/libros/asignaturas/modificar-asignatura/modificar-asignatura.component';

//Electivos
import { ElectivosComponent } from './components/libros/electivos/electivos.component';
import { CrearElectivoComponent } from './components/libros/electivos/crear-electivo/crear-electivo.component';
import { ModificarElectivoComponent } from './components/libros/electivos/modificar-electivo/modificar-electivo.component';
import { VerElectivosComponent } from './components/libros/electivos/ver-electivos/ver-electivos.component';
import { ElectivoDetailComponent } from './components/libros/electivos/electivo-detail/electivo-detail.component';
import { NotasElectivoComponent } from './components/libros/electivos/notas-electivo/notas-electivo.component';
import { NotasElectivoIngresarComponent } from './components/libros/electivos/notas-electivo/notas-electivo-ingresar/notas-electivo-ingresar.component';
import { NotasElectivoVerComponent } from './components/libros/electivos/notas-electivo/notas-electivo-ver/notas-electivo-ver.component';

//Funcionarios
import { FuncionariosComponent } from './components/sistema/funcionarios/funcionarios.component';
import { CrearFuncionarioComponent } from './components/sistema/funcionarios/crear-funcionario/crear-funcionario.component';
import { VerFuncionariosComponent } from './components/sistema/funcionarios/ver-funcionarios/ver-funcionarios.component';
import { FuncionarioDetailComponent } from './components/sistema/funcionarios/funcionario-detail/funcionario-detail.component';
import { EditarFuncionarioComponent } from './components/sistema/funcionarios/editar-funcionario/editar-funcionario.component';

//Configuracion
import { ConfiguracionComponent } from './components/sistema/configuracion/configuracion.component';
import { ConfiguracionDashboardComponent } from './components/sistema/configuracion/configuracion-dashboard/configuracion-dashboard.component';
import { CalendarioAcademicoComponent } from './components/sistema/configuracion/calendario-academico/calendario-academico.component';
import { NotasPonderacionesComponent } from './components/sistema/configuracion/notas-ponderaciones/notas-ponderaciones.component';
import { JornadaComponent } from './components/sistema/configuracion/jornada/jornada.component';
import { PlanesEnsenanzaComponent } from './components/sistema/configuracion/planes-ensenanza/planes-ensenanza.component';
import { AsignaturasEspecialesComponent } from './components/sistema/configuracion/asignaturas-especiales/asignaturas-especiales.component';
//Documentos
import { DocumentosComponent } from './components/documentos/documentos.component';
import { InformesComponent } from './components/documentos/informes/informes.component';
import { CertificadosComponent } from './components/documentos/certificados/certificados.component';
import { CitacionesComponent } from './components/documentos/citaciones/citaciones.component';

const routes: Routes = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full'},

  { path: 'dashboard', component: DashboardComponent },

  { path: '403', component: ForbiddenComponent },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: 'alerta-configuracion/:id', component: AlertaConfigComponent },

	{ path: 'sistema/colegios',  component: ColegiosComponent, canActivate: [SostenedorGuard], canActivateChild: [SostenedorGuardChild],
    children: [
      { path: '', redirectTo: 'ver', pathMatch: 'full' },
      { path: 'ver',  component: VerColegioComponent },
      { path: 'ver/:id',  component: ColegioDetailComponent },
      { path: 'crear',  component: CrearColegioComponent },
      { path: 'editar/:id',  component: EditarColegioComponent },
    ]
	},

  { path: 'sistema/matriculas',  component: MatriculaComponent,canActivate:[DigitadorGuard],canActivateChild:[DigitadorGuardChild],
    children: [
      { path: '', redirectTo: 'ver', pathMatch: 'full'},
      { path: 'ver',  component: VerMatriculaComponent },
      { path: 'ver/:id',  component: MatriculaDetailComponent },
      { path: 'crear',  component: CrearMatriculaComponent },
      { path: 'editar/:id',  component: EditarMatriculaComponent },
    ]
  },

  { path: 'sistema/postulaciones',  component: PostulacionesComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: PostulacionesDashboardComponent },
      { path: 'ver',  component: VerPostulacionesComponent },
      { path: 'aceptadas', component: PostulacionesAceptadasComponent },
      { path: 'rechazadas', component: PostulacionesRechazadasComponent },
      { path: 'espera', component: PostulacionesEsperaComponent },
      { path: 'ver/:id',  component: PostulacionDetailComponent },
      { path: 'crear',  component: CrearPostulacionComponent },
      { path: 'editar/:id',  component: ModificarPostulacionComponent },
    ]
  },

  { path: 'libros',  component: CursosComponent, canActivate:[AdministradorGuard], canActivateChild:[AdministradorGuardChild],
    children: [
      { path: '', redirectTo: 'ver-cursos', pathMatch: 'full' },
      { path: 'ver-cursos', component: VerCursoComponent },
      { path: 'crear-curso',  component: CrearCursoComponent },
      { path: 'ver-cursos/:id',  component: CursoDetailComponent,
        children: [
          { path:'', redirectTo:'lista',pathMatch: 'full'},
          { path: 'lista', component: CursoListaComponent },
          { path: 'notas', component: CursoNotasComponent,
            children: [
              { path: '', redirectTo: 'ver' ,pathMatch: 'full' },
              { path:'ver', component: CursoNotasVerComponent},
              { path:'ingresar', component: CursoNotasIngresarComponent},
            ]
          },
          { path: 'asistencia', component: CursoAsistenciaComponent,
            children: [
              { path: '', redirectTo: 'ver' ,pathMatch: 'full' },
              { path:'ver', component: CursoAsistenciaVerComponent},
              { path:'ingresar', component: CursoAsistenciaIngresarComponent},
            ],
            canActivate: [ConfigCalendarioAcademicoGuard]
          },
          { path: 'anotaciones', component: CursoAnotacionesComponent,
            children: [
              { path: '', redirectTo: 'ver' ,pathMatch: 'full' },
              { path:'ver', component: CursoAnotacionesVerComponent},
              { path:'general', component: CursoAnotacionesVerGenComponent},
              { path:'ingresar', component: CursoAnotacionesIngresarComponent},
            ]
          },
        ]
      },
      { path: ':id/profesores',  component: AsignarProfesorACursoComponent },
      { path: 'editar-curso/:id',  component: ModificarCursoComponent },
      { path: 'profesores', component: ProfesoresComponent,
        children:[
          {path: '', redirectTo:'ver', pathMatch: 'full'},
          {path:'ver', component: VerProfesoresComponent },
          {path:'asignar/:id',component:AsignarProfesorComponent}
        ]
      },
      { path: 'asignaturas', component: AsignaturasComponent,
        children:[
          {path: '', redirectTo:'ver', pathMatch: 'full'},
          {path:'ver', component: VerAsignaturasComponent },
          {path:'editar/:id',component:ModificarAsignaturaComponent}
        ]
      },
      {
        path: 'electivos', component: ElectivosComponent,
        children:[
          {path: '', redirectTo:'ver',pathMatch:'full'},
          {path:'ver', component: VerElectivosComponent },
          {path:'crear',component:CrearElectivoComponent},
          {path:'editar/:id',component:ModificarElectivoComponent},
          {
            path:'ver/:id',component:ElectivoDetailComponent,
            children:[
              { path:'', redirectTo:'notas',pathMatch: 'full'},
              { path: 'notas', component: NotasElectivoComponent,
                children: [
                  { path: '', redirectTo: 'ver' ,pathMatch: 'full' },
                  { path:'ver', component: NotasElectivoVerComponent},
                  { path:'ingresar', component: NotasElectivoIngresarComponent},
                ]
              },
            ]
          },
        ]
      }
    ]
  },
  { path: 'cierre', component: CierreAnnoComponent },

  { path: 'docs', component: DocumentosComponent, canActivate:[DigitadorGuard], canActivateChild:[DigitadorGuardChild],
    children: [
      { path: '', redirectTo: 'informes', pathMatch: 'full' },
      { path: 'informes', component: InformesComponent },
      { path: 'certificados', component: CertificadosComponent },
      { path: 'citaciones', component: CitacionesComponent },
    ]
  },
  { path: 'sistema/funcionarios', component: FuncionariosComponent, canActivate:[AdministradorGuard],canActivateChild:[AdministradorGuardChild],
    children: [
      {path:'', redirectTo: 'ver', pathMatch:'full' },
      {path:'ver', component: VerFuncionariosComponent },
      {path:'ver/:id', component: FuncionarioDetailComponent },
      {path:'crear', component: CrearFuncionarioComponent },
      {path:'editar/:id', component: EditarFuncionarioComponent },
    ]
  },
  { path: 'sistema/configuracion', component: ConfiguracionComponent, canActivate: [ConfiguracionesGuard], canActivateChild: [ConfiguracionesGuardChild],
    children: [
      {path:'', redirectTo: 'dashboard', pathMatch:'full' },
      {path:'dashboard', component: ConfiguracionDashboardComponent},
      {path:'calendario', component: CalendarioAcademicoComponent },
      {path:'notas', component: NotasPonderacionesComponent },
      {path:'jornada', component: JornadaComponent },
      {path:'planes-ensenanza', component: PlanesEnsenanzaComponent },
      {path:'asignaturas-especiales', component: AsignaturasEspecialesComponent },
    ]
  },
  { path: '**', redirectTo: '404'},
];

const rootRoutes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full'},

  { path: 'app',
    component: AppComponent,
    children: routes,
    canActivate: [AuthGuard,ScriptsGuard],
    canActivateChild: [AuthGuardChild,ScriptsGuardChild] },

  { path: 'login', component: LoginComponent },
  { path: 'after', component: SostenedorAfterLoginComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(rootRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
