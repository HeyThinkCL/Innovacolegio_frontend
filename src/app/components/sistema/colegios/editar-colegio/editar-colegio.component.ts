import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }       from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { connectionErrorMsg, invalidRequestMsg } from '../../../spinner/spinner.component';

import { ColegiosService } from '../../../../services/sistema/colegios.service';
import { DpaService } from '../../../../services/sistema/dpa.service';
import { Colegio } from '../colegio';

@Component({
  selector: 'app-editar-colegio',
  templateUrl: 'editar-colegio.component.html',
  styleUrls: ['editar-colegio.component.css']
})
export class EditarColegioComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  @ViewChild('warning') warningModal: ModalComponent;

  id: number;
  private sub: any;

  selectedColegio: any;
  colegio: Colegio;

  regiones = [];
  provincias = [];
  comunas = [];

  selectedRegion: any;
  selectedProvincia: any;
  selectedComuna: any;

  timeoutMessage: string;

  constructor(
      private route: ActivatedRoute,
      private location: Location,
      private colegiosService: ColegiosService,
      private dpaService: DpaService,
  ) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.timeoutMessage = connectionErrorMsg();

    if(window.innerWidth < 785){
      this.warningModalOpen();
    }
    // this.selectedColegio = new Colegio();
    this.colegio = new Colegio();

    this.sub = this.route.params.subscribe( params => { this.id = +params['id'];});

    this.route.params
      .switchMap((params: Params) => this.colegiosService.getColegio(+params['id']))
      .subscribe((colegio) => {

        this.colegio = colegio;

        this.selectedColegio = JSON.parse(JSON.stringify(colegio));
        if(!(colegio)){
          this.timeoutMessage = invalidRequestMsg();
        }
        this.dpaService.getRegiones().subscribe(res => {
          this.regiones = res;
          this.selectedRegion = this.regiones.find(reg => reg.nombre == this.selectedColegio.region);
          if(this.selectedRegion){
            this.dpaService.getProvinciasByRegionId(this.selectedRegion.codigo).subscribe(subres => {
              this.provincias = subres;
              this.selectedProvincia = this.provincias.find(prov => prov.nombre == this.selectedColegio.provincia);
              if(this.selectedProvincia){
                this.dpaService.getComunasByProvinciaIdRegionId(this.selectedProvincia.codigo).subscribe(ssubres => {
                  this.comunas = ssubres;
                  this.selectedComuna = this.comunas.find(com => com.nombre == this.selectedColegio.comuna);
                  if(this.selectedComuna){
                    this.dpaService.getDeptoProvincialbyComunaId(this.selectedComuna.codigo).subscribe(sssubres => {
                      this.colegio.depto_prov = sssubres.depto;
                    });
                  }
                });
              }
            });
          }
        });
    });
  }

  imgUpload(e){
    let reader = new FileReader();
    let file = e.target.files[0];
    if(file){
      reader.readAsDataURL(file);
      reader.onload = (e) => {

        this.colegio.img=reader.result;
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
    this.goBack();
  }

  warningModalOpen(): void {
    this.warningModal.open('lg');
  }

  warningModalClose(): void {
    this.goBack();
  }

  saveColegio(): void {
    this.colegiosService.updateColegio(this.colegio).subscribe((res) => {
      this.selectedColegio = JSON.parse(JSON.stringify(res));
      this.modalOpen();
    });
  }

  setRegion(region: string){
    this.colegio.provincia = null;
    this.colegio.comuna = null;
    this.colegio.depto_prov = null;
    this.selectedRegion = this.regiones.find(reg => reg.nombre == region);
    this.dpaService.getProvinciasByRegionId(this.selectedRegion.codigo).subscribe(res => {
      this.provincias = res;
    });
  };

  setProvincia(provincia: string){
    this.colegio.comuna = null;
    this.colegio.depto_prov = null;
    this.selectedProvincia = this.provincias.find(prov => prov.nombre == provincia);
    this.dpaService.getComunasByProvinciaIdRegionId(this.selectedProvincia.codigo).subscribe(res => {
      this.comunas = res;
    });
  };

  setComuna(comuna: string){
    this.selectedComuna = this.comunas.find(com => com.nombre == comuna);
    this.dpaService.getDeptoProvincialbyComunaId(this.selectedComuna.codigo).subscribe(res => {
      this.colegio.depto_prov = res.depto;
    });
  }
}
