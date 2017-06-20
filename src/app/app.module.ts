
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import { Select2Module } from 'ng2-select2';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Ng2DatetimePickerModule, Ng2Datetime } from 'ng2-datetime-picker';
import { MomentModule } from 'angular2-moment';
import './rxjs-extensions';

//pipes
import { FilterCursoProf } from './pipes/filter-curso-prof.pipe';
import { CalcPromedio } from './pipes/calc-promedio.pipe';
import {ShowEvalEspecialPipe } from './pipes/show-eval-especial.pipe'
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { AbbreviatePipe } from './pipes/abbreviate.pipe'
import {FilterTablePipe} from "./pipes/filter-table.pipe";
import {FilterSelectedPipe} from "./pipes/filter-selected.pipe";
import {Select2WidthFixPipe } from "./pipes/select2-width-fix.pipe"
import {FilterProfByAsign } from "./pipes/filter-prof-asignatura"
import {FilterAsignaturas } from "./pipes/filter-asignaturas"
import {FilterAsignarPipe} from './pipes/filter-asignar.pipe';
import {FilterConfigsPipe} from './pipes/filter-configs.pipe'
import {ColegioNameFilterPipe} from './pipes/colegio-name-filter.pipe';
import {ColegioImgFilterPipe} from './pipes/colegio-img-filter.pipe';
import { IncludeProfesorPipe } from './pipes/include-profesor.pipe';
import { FilterCursoByGrado } from './pipes/filter-curso-by-grado.pipe';
import { LimitCursosPipe } from './pipes/limit-cursos.pipe';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent } from './app.component';
import { RootComponent } from './root.component';
//Login
import { LoginComponent } from './components/login/login.component';
import { SostenedorAfterLoginComponent } from './components/login/sostenedor-after-login/sostenedor-after-login.component';
//Misc
import { NotFoundComponent } from './components/misc/not-found/not-found.component';
import { ForbiddenComponent } from './components/misc/forbidden/forbidden.component';
import { ServerErrorComponent } from './components/misc/server-error/server-error.component';
import { AlertaConfigComponent } from './components/misc/alerta-config/alerta-config.component';
import { RedirectComponent } from './components/misc/redirect/redirect.component';
//Dashboard
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

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
import { NotasElectivoComponent } from './components/libros/electivos/notas-electivo/notas-electivo.component';
import { NotasElectivoIngresarComponent } from './components/libros/electivos/notas-electivo/notas-electivo-ingresar/notas-electivo-ingresar.component';
import { NotasElectivoVerComponent } from './components/libros/electivos/notas-electivo/notas-electivo-ver/notas-electivo-ver.component';
import { ElectivoDetailComponent } from './components/libros/electivos/electivo-detail/electivo-detail.component';

//Documentos
import { DocumentosComponent } from './components/documentos/documentos.component';
import { InformesComponent } from './components/documentos/informes/informes.component';
import { Informes2Component } from './components/documentos/informes2/informes2.component';
import { CertificadosComponent } from './components/documentos/certificados/certificados.component';
import { CitacionesComponent } from './components/documentos/citaciones/citaciones.component';
import { ByPlanesEstudioComponent } from './components/documentos/filtros/by-planes-estudio/by-planes-estudio.component';
import { ByTipoEnsenanzaComponent } from './components/documentos/filtros/by-tipo-ensenanza/by-tipo-ensenanza.component';
import { ByGradoComponent } from './components/documentos/filtros/by-grado/by-grado.component';
import { ByCursoComponent } from './components/documentos/filtros/by-curso/by-curso.component';
import { ByAlumnoComponent } from './components/documentos/filtros/by-alumno/by-alumno.component';

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
//Servicios
import {AuthenticationService} from './services/authentication.service';
import { MatriculaService } from "./services/sistema/matricula.service";
import {ColegiosService } from './services/sistema/colegios.service';
import {CursosService} from "./services/libros/cursos.service";
import {ProfesoresService} from "./services/libros/profesores.service";
import {AsignaturasService} from "./services/libros/asignaturas.service";
import {NotasService} from "./services/libros/notas.service";
import {AnotacionesService} from './services/libros/anotaciones.service';
import {DpaService} from './services/sistema/dpa.service';
import {EtniasService} from './services/sistema/etnias.service';
import {EstadosCivilesService} from './services/sistema/estados-civiles.service'
import {PostulacionesService} from './services/sistema/postulaciones.service';
import {ApoderadosService} from './services/sistema/apoderados.service';
import {FuncionariosService} from './services/sistema/funcionarios.service';
import {ConfiguracionService} from './services/sistema/configuracion.service';
import {CalendarioService} from './services/sistema/configuraciones/calendario.service';
import {ConfigNotasService} from './services/sistema/configuraciones/config-notas.service';
import {AsignaturasEspecialesService} from './services/sistema/configuraciones/asignaturas-especiales.service';
import {AsistenciaService} from "./services/libros/asistencia.service";
import {PlanDeEstudiosService} from './services/sistema/configuraciones/plan-de-estudios.service';
import {RedirectService} from './services/redirect.service';
import {CertificadosService} from './services/documentos/certificados.service';
import {CitacionesService} from './services/documentos/citaciones.service';
import {InformesService} from './services/documentos/informes.service';
import {DashboardService} from './services/dashboard.service'

//Guards
import {AuthGuard,AuthGuardChild} from './guards/auth.guard';
import {ScriptsGuard, ScriptsGuardChild} from './guards/scripts.guard';
import {ConfigCalendarioAcademicoGuard} from './guards/config-guards/config-calendario-academico.guard';
import {AdministradorGuard,AdministradorGuardChild} from './guards/sesion-guards/administrador.guard';
import {ConfiguracionesGuard,ConfiguracionesGuardChild} from './guards/sesion-guards/configuraciones.guard';
import {DigitadorGuard,DigitadorGuardChild} from './guards/sesion-guards/digitador.guard';
import {SostenedorGuard,SostenedorGuardChild} from './guards/sesion-guards/sostenedor.guard';
import { AsistenciaColegioComponent } from './components/dashboard/charts/asistencia-colegio/asistencia-colegio.component';
import { AlumnosColegioComponent } from './components/dashboard/charts/alumnos-colegio/alumnos-colegio.component';




@NgModule({
  declarations: [
    RootComponent,
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ColegiosComponent,
    CrearColegioComponent,
    EditarColegioComponent,
    MatriculaComponent,
    CrearMatriculaComponent,
    EditarMatriculaComponent,
    VerColegioComponent,
    VerMatriculaComponent,
    CursosComponent,
    CrearCursoComponent,
    VerCursoComponent,
    ModificarCursoComponent,
    ProfesoresComponent,
    AsignarProfesorACursoComponent,
    ColegioDetailComponent,
    MatriculaDetailComponent,
    CursoDetailComponent,
    CursoNotasComponent,
    CursoListaComponent,
    CursoAsistenciaComponent,
    CursoAnotacionesComponent,
    CursoNotasVerComponent,
    CursoNotasIngresarComponent,
    CursoAsistenciaVerComponent,
    CursoAsistenciaIngresarComponent,
    CursoAnotacionesVerComponent,
    CursoAnotacionesVerGenComponent,
    CursoAnotacionesIngresarComponent,
    DocumentosComponent,
    InformesComponent,
    Informes2Component,
    CertificadosComponent,
    CitacionesComponent,
    ByTipoEnsenanzaComponent,
    ByGradoComponent,
    ByCursoComponent,
    ByAlumnoComponent,
    PostulacionesComponent,
    CrearPostulacionComponent,
    PostulacionDetailComponent,
    VerPostulacionesComponent,
    PostulacionesAceptadasComponent,
    PostulacionesRechazadasComponent,
    PostulacionesEsperaComponent,
    ModificarPostulacionComponent,
    PostulacionesDashboardComponent,
    FuncionariosComponent,
    CierreAnnoComponent,
    CrearFuncionarioComponent,
    VerFuncionariosComponent,
    FuncionarioDetailComponent,
    EditarFuncionarioComponent,
    FilterCursoProf,
    CalcPromedio,
    ShowEvalEspecialPipe,
    TruncateTextPipe,
    AbbreviatePipe,
    FilterTablePipe,
    FilterSelectedPipe,
    Select2WidthFixPipe,
    FilterProfByAsign,
    FilterAsignaturas,
    FilterAsignarPipe,
    FilterConfigsPipe,
    ColegioNameFilterPipe,
    ColegioImgFilterPipe,
    IncludeProfesorPipe,
    FilterCursoByGrado,
    LimitCursosPipe,
    ConfiguracionComponent,
    AsignaturasEspecialesComponent,
    ConfiguracionDashboardComponent,
    CalendarioAcademicoComponent,
    NotasPonderacionesComponent,
    JornadaComponent,
    PlanesEnsenanzaComponent,
    CursosComponent,
    VerProfesoresComponent,
    AsignarProfesorComponent,
    AsignaturasComponent,
    VerAsignaturasComponent,
    ModificarAsignaturaComponent,
    ElectivosComponent,
    CrearElectivoComponent,
    ModificarElectivoComponent,
    VerElectivosComponent,
    ElectivoDetailComponent,
    NotasElectivoComponent,
    NotasElectivoIngresarComponent,
    NotasElectivoVerComponent,
    SpinnerComponent,
    PlanesEnsenanzaComponent,
    SostenedorAfterLoginComponent,
    NotFoundComponent,
    ForbiddenComponent,
    ServerErrorComponent,
    ByPlanesEstudioComponent,
    AlertaConfigComponent,
    RedirectComponent,
    AsistenciaColegioComponent,
    AlumnosColegioComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2Bs3ModalModule,
    Select2Module,
    Ng2DatetimePickerModule,
    MomentModule,
    ChartsModule
  ],
  providers: [
    AuthGuard,
    AuthGuardChild,
    ScriptsGuard,
    ScriptsGuardChild,
    DashboardService,
    ConfigCalendarioAcademicoGuard,
    SostenedorGuard,
    SostenedorGuardChild,
    AdministradorGuard,
    AdministradorGuardChild,
    DigitadorGuard,
    DigitadorGuardChild,
    ConfiguracionesGuard,
    ConfiguracionesGuardChild,
    AuthenticationService,
    DpaService,
    EtniasService,
    ColegiosService,
    MatriculaService,
    PostulacionesService,
    ApoderadosService,
    CursosService,
    ProfesoresService,
    AsignaturasService,
    NotasService,
    AnotacionesService,
    EstadosCivilesService,
    FuncionariosService,
    AsistenciaService,
    ConfiguracionService,
    CalendarioService,
    ConfigNotasService,
    PlanDeEstudiosService,
    AsignaturasEspecialesService,
    RedirectService,
    CertificadosService,
    InformesService,
    CitacionesService,
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
