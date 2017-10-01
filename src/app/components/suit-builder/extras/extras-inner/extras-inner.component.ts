import { Component, OnInit } from '@angular/core';
import {TabsService} from '../../../../services/tabs.service';

@Component({
  selector: 'app-extras-inner',
  templateUrl: './extras-inner.component.html',
  styleUrls: ['./extras-inner.component.scss']
})
export class ExtrasInnerComponent implements OnInit {

  stepsLength: number;
  steps: any[];
  completed0: boolean;

  constructor(private service: TabsService) {
    this.steps = [];
    this.stepsLength = 6;
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

  completeSuit() {
      this.service.changeTab("measurements");
  }

}
