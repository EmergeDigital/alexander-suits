import { Component, OnInit } from '@angular/core';
import {TabsService} from '../../../../services/tabs.service';

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
    {"name": "1", "url": "assets/suit-builder/collars/collar-v1.png"},
    {"name": "2", "url": "assets/suit-builder/collars/collar-v2.png"},
    {"name": "3", "url": "assets/suit-builder/collars/collar-v3.png"},
    {"name": "4", "url": "assets/suit-builder/collars/collar-v4.png"},
    {"name": "5", "url": "assets/suit-builder/collars/collar-v5.png"},
    {"name": "6", "url": "assets/suit-builder/collars/collar-v6.png"},
    {"name": "7", "url": "assets/suit-builder/collars/collar-v7.png"},
    {"name": "8", "url": "assets/suit-builder/collars/collar-v8.png"},
    {"name": "9", "url": "assets/suit-builder/collars/collar-v11.png"},
  ];
  pants: any[] = [
    {"name": "1", "url": "assets/suit-builder/pants/pants-v1.png"},
    {"name": "2", "url": "assets/suit-builder/pants/pants-v2.png"},
    {"name": "3", "url": "assets/suit-builder/pants/pants-v3.png"},
  ];
  vents: any[] = [
    {"name": "1", "url": "assets/suit-builder/vents/vents-v1.png"},
    {"name": "2", "url": "assets/suit-builder/vents/vents-v2.png"},
  ];
  pockets: any[] = [
    {"name": "1", "url": "assets/suit-builder/pockets/pocket-v1.png"},
    {"name": "2", "url": "assets/suit-builder/pockets/pocket-v2.png"},
    {"name": "3", "url": "assets/suit-builder/pockets/pocket-v3.png"},
    {"name": "4", "url": "assets/suit-builder/pockets/pocket-v4.png"},
    {"name": "5", "url": "assets/suit-builder/pockets/pocket-v5.png"},
  ];
  buttons: any[] = [
    {"name": "1", "desc": "Fake button holes", "url": "assets/suit-builder/buttons/buttons-v1.png"},
    {"name": "2", "desc": "Working button holes", "url": "assets/suit-builder/buttons/buttons-v2.png"},
  ];
  tongues: any[] = [
    {"name": "1", "desc": "Tongue facing integrated", "url": "assets/suit-builder/tongue/tongue-v1.png"},
    {"name": "2", "desc": "Tongue facing detached", "url": "assets/suit-builder/tongue/tongue-v2.png"},
    {"name": "3", "desc": "Tongue facing with tongue", "url": "assets/suit-builder/tongue/tongue-v3.png"},
  ];
  selectedCollar: any = {"name": "1", "url": "assets/suit-builder/collars/collar-v1.png"};
  selectedPant: any = {"name": "1", "url": "assets/suit-builder/pants/pants-v1.png"};
  selectedVent: any = {"name": "1", "url": "assets/suit-builder/vents/vents-v1.png"};
  selectedPocket: any = {"name": "1", "url": "assets/suit-builder/pockets/pocket-v1.png"};
  selectedButtons: any = {"name": "1", "desc": "Fake button holes", "url": "assets/suit-builder/buttons/buttons-v1.png"};
  selectedTongue: any = {"name": "1", "desc": "Tongue facing integrated", "url": "assets/suit-builder/tongue/tongue-v1.png"};
  addPants: boolean = true;

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

  selectCollar(collar) {
    this.selectedCollar = collar;
  }

  selectPants(pant) {
    this.selectedPant = pant;
  }

  selectVent(vent) {
    this.selectedVent = vent;
  }

  selectPocket(pocket) {
    this.selectedPocket = pocket;
  }

  selectButtons(button) {
    this.selectedButtons = button;
  }

  selectTongue(tongue) {
    this.selectedTongue = tongue;
  }


  changeStep(s){
    for(let step of this.steps) {
      step.display = "none";
    }

    this.steps[s].display = 'block';
  }

  completeSuit() {
      this.service.changeTab("contrast");
  }




}
