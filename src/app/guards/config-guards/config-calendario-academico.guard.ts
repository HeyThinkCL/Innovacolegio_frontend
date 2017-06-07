/**
 * Created by matias on 18-03-17.
 */
import { Injectable } from '@angular/core';
import {Router, CanActivate, CanActivateChild} from '@angular/router';
import {ConfiguracionService} from '../../services/sistema/configuracion.service';
import {CalendarioService} from '../../services/sistema/configuraciones/calendario.service';

@Injectable()
export class ConfigCalendarioAcademicoGuard implements CanActivate {

  constructor(
    private configuracionService: ConfiguracionService,
    private calendarioService: CalendarioService,
    private router: Router,
  ) {
    this.configuracionService.getConfiguraciones().subscribe(configs => {
      let config = configs.find(c => c.glosa == 'Calendario Académico');

      this.calendarioService.getConfigCalendarioAcademicoById(config.id).subscribe(subRes => {

      });
    });
  }

  canActivate() {
    return true
  }

}
