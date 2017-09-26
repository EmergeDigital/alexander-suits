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
  collars: any[] = [
    {"name": "1", "url": "assets/suit-builder/collar-v1.png"},
    {"name": "2", "url": "assets/suit-builder/collar-v2.png"},
    {"name": "3", "url": "assets/suit-builder/collar-v3.png"},
    {"name": "4", "url": "assets/suit-builder/collar-v4.png"},
    {"name": "5", "url": "assets/suit-builder/collar-v5.png"},
    {"name": "6", "url": "assets/suit-builder/collar-v6.png"},
    {"name": "7", "url": "assets/suit-builder/collar-v7.png"},
    {"name": "8", "url": "assets/suit-builder/collar-v8.png"},
    {"name": "9", "url": "assets/suit-builder/collar-v11.png"},
  ];
  selectedCollar: any = {"name": "1", "url": "assets/suit-builder/collar-v1.png"};

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

  selectCollar(collar) {
    this.selectedCollar = collar;
  }

  changeStep(s){
    for(let step of this.steps) {
      step.display = "none";
    }

    this.steps[s].display = 'block';
  }




}
