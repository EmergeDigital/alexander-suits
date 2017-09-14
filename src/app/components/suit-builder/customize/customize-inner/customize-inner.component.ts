import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-customize-inner',
  templateUrl: './customize-inner.component.html',
  styleUrls: ['./customize-inner.component.scss']
})
export class CustomizeInnerComponent implements OnInit {

  stepsLength: number;
  steps: any[];
  completed0: boolean;

  constructor() {
    this.steps = [];
    this.stepsLength = 4;
    this.steps.push({display: "block"});
    for(let i = 1; i < this.stepsLength; i++) {
      this.steps.push({display: "none"});
    }

    this.completed0 = false;
  }

  ngOnInit() {
  }

  changeStep(s){
    for(let step of this.steps) {
      step.display = "none";
    }

    this.steps[s].display = 'block';
  }




}
