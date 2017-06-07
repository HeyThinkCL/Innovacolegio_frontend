import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }       from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { connectionErrorMsg, invalidRequestMsg } from '../../../spinner/spinner.component';

import { ColegiosService } from '../../../../services/sistema/colegios.service';
import { Colegio } from '../colegio';

@Component({
  selector: 'app-colegio-detail',
  templateUrl: 'colegio-detail.component.html',
  styleUrls: ['colegio-detail.component.css']
})
export class ColegioDetailComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  id: number;
  private sub: any;

  colegio: any;

  timeoutMessage: string;

  constructor(
    private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private colegiosService: ColegiosService,) {
  }

  ngOnInit() {
    // this.colegio = new Colegio();
    this.timeoutMessage = connectionErrorMsg();

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.route.params
      .switchMap((params: Params) => this.colegiosService.getColegio(+params['id']))
      .subscribe((colegio) => {
        this.colegio = colegio;
        if(!(colegio)){
          this.timeoutMessage = invalidRequestMsg();
        }
        this.colegio['plan_estudios'] = {
          'decreto': '',
        }; //placeholder
      });
  }

  goBack(): void {
    this.location.back();
  }

  goToEdit(id: number){
    this.router.navigate(['./editar',id],{relativeTo: this.route.parent});

  }

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.deleteColegio();
  }

  modalDismiss(): void {
    this.modal.dismiss();
  }

  deleteColegio(): void {
    this.colegiosService.deleteColegio(this.colegio.id).subscribe(()=>{
      this.modal.close();
      this.goBack();
    });
  }
}
