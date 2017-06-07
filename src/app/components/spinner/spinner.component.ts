import { Component, OnInit, Input, trigger, transition, style, animate, keyframes } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  animations: [
    trigger(
      'fade', [
        transition(':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('90ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class SpinnerComponent implements OnInit {
  @Input('timeoutMessage') timeoutMessage: string;
  @Input('timeout') timeout: number;

  timeoutCheck: boolean = false;

  constructor() { }

  ngOnInit() {
    if(!isNaN(this.timeout)) {
      setTimeout(() => {
        this.timeoutCheck = true;
      }, 1000*this.timeout);
    }
  }

  timeoutId = setTimeout(() => {
    this.timeoutCheck = true;
  }, 1000*40);

  //To modify the timeout length, the app-spinner component called in HTML must be re-rendered using *ngIf.
  //Simple way to do this is by setting the variable timeout, setting it to null after receiving the API response
  //and then assigning a value to it.
}

//Global Messages

export function emptyArrayMsg(subject: string): string {
  return 'No se encontraron ' + subject + ' en la base de datos.';
}

export function connectionErrorMsg(): string {
  return 'Sin conexión con el servidor.';
}

export function invalidRequestMsg(): string{
  return 'Petición inválida.';
}
