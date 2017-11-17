import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import {TabsService} from '../../../../services/tabs.service';
import {SuitService} from "./../../../../services/customizers/suit.service";
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

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
    {"name": "1", "url": ""},
    {"name": "2", "url": "assets/suit-builder/pants/pants-v1.png"},
    {"name": "3", "url": "assets/suit-builder/pants/pants-v2.png"},
    {"name": "4", "url": "assets/suit-builder/pants/pants-v3.png"},
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
  selectedCollar: any = {};
  selectedPant: any = {};
  selectedVent: any = {};
  selectedPocket: any = {};
  selectedButtons: any = {};
  selectedTongue: any = {};
  addPants: boolean = true;
  loading: boolean = true;

  constructor(private service: TabsService, private _scrollToService: ScrollToService, public suitService: SuitService) {
    this.steps = [];
    this.stepsLength = 5;
    this.steps.push({display: "block"});
    for(let i = 1; i < this.stepsLength; i++) {
      this.steps.push({display: "none"});
    }

    this.loading = true;
    console.log(suitService.suit);
    this.selectedCollar = this.suitService.suit.collar;
    this.selectedVent = this.suitService.suit.vents;
    this.selectedPocket = this.suitService.suit.pockets;
    this.selectedButtons = this.suitService.suit.button_holes;
    this.selectedTongue = this.suitService.suit.tongue;
    if(this.suitService.suit.pants === null) {
      this.addPants = false;
    } else {
      this.selectedPant = this.suitService.suit.pants;
      this.addPants = true;
    }
    setTimeout(()=> {
      this.loading = false;
    }, 1);

    this.completed0 = false;
  }

  ngOnInit() {
  }

  selectCollar(collar) {
    this.selectedCollar = collar;
    this.suitService.suit.collar = collar;
  }

  selectPants(pant) {
    this.selectedPant = pant;
    this.suitService.suit.pants = pant;
  }

  selectVent(vent) {
    this.selectedVent = vent;
    this.suitService.suit.vents = vent;
  }

  selectPocket(pocket) {
    this.selectedPocket = pocket;
    this.suitService.suit.pockets = pocket;
  }

  selectButtons(button) {
    this.selectedButtons = button;
    this.suitService.suit.button_holes = button;
  }

  selectTongue(tongue) {
    this.selectedTongue = tongue;
    this.suitService.suit.tongue = tongue;
  }

  changedPants(){
    console.log(this.addPants);
    if(this.addPants === false) {
      this.suitService.suit.pants = null;
    }
  }


  changeStep(s){
    for(let step of this.steps) {
      step.display = "none";
    }

    this.steps[s].display = 'block';
    setTimeout(()=> {
      console.log("scrolling to " + s);
      
      const config: ScrollToConfigOptions = {
        target: 'stepper'+s
      };

      this._scrollToService.scrollTo(config);
    }, 10)
  }

  completeSuit() {
      
      const config: ScrollToConfigOptions = {
        target: 'tabTitle'
      };

      this._scrollToService.scrollTo(config);
      setTimeout(()=> {
        this.service.changeTab("extras");
      }, 0.32)
      // this.service.changeTab("extras");
  }




}
