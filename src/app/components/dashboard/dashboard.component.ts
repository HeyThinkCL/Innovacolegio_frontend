import { Component, OnInit } from '@angular/core';

import { connectionErrorMsg } from '../spinner/spinner.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  timeoutMessage: string;

  constructor() { }

  ngOnInit() {
    this.timeoutMessage = connectionErrorMsg();
  }

}
