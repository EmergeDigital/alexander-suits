import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-customize-inner',
  templateUrl: './customize-inner.component.html',
  styleUrls: ['./customize-inner.component.scss']
})
export class CustomizeInnerComponent implements OnInit {

  s0: any;
  s1: any;
  s2: any;
  s3: any;
  completed0: boolean;
  step: string;
  steps: any[];

  constructor() {
    this.s0 = {
      'display': 'block'
    };
    this.s1 = {
      'display': 'none'
    };
    this.s2 = {
      'display': 'none'
    };
    this.s3 = {
      'display': 'none'
    };

    this.step = "step0";
    this.completed0 = false;
    this.steps = [this.s0, this.s1, this.s2, this.s3];
  }

  ngOnInit() {
  }

  changeStep(s){
    this.s0.display = 'none';
    this.s1.display = 'none';
    this.s2.display = 'none';
    this.s3.display = 'none';

    // let _step = this.steps[s];
    this.step = "step" + s;

    this.steps[s].display = 'block';

  }




}
