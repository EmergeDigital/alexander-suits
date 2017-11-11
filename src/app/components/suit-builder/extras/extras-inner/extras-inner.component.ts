import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';

import {TabsService} from '../../../../services/tabs.service';
import {SuitService} from "./../../../../services/customizers/suit.service";
import {MeasurementsService} from "./../../../../services/customizers/measurements.service";

@Component({
  selector: 'app-extras-inner',
  templateUrl: './extras-inner.component.html',
  styleUrls: ['./extras-inner.component.scss']
})
export class ExtrasInnerComponent implements OnInit {

  stepsLength: number;
  steps: any[];
  completed0: boolean;
  selectedOption: string = "";
  mockup: boolean = false;
  addWC: boolean = false;
  addCoat: boolean = false;
  addPants: boolean = false;
  loading: boolean = true;
  mockupPrice: number = 0;
  coatPrice: number = 0;
  wcPrice: number = 0;
  pantsPrice: number = 0;
  subtotal: number = 0;
  comments: string = '';
  buttons: string;
  button_stitching: string;
  contrast_fabric: string;
  options: string[] = [
    "None",
    "Tuxedo",
    "Undercollar",
    "Tweed"
  ];

  config: SwiperOptions = {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      spaceBetween: 30,
      loop: true
  };

  constructor(private service: TabsService, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any,
              public suitService: SuitService, public measurementsService: MeasurementsService) {

    this.loading = true;

    this.steps = [];
    this.stepsLength = 5;
    this.steps.push({display: "block"});
    for(let i = 1; i < this.stepsLength; i++) {
      this.steps.push({display: "none"});
    }
    this.mockup = this.suitService.suit.mockup;
    this.addWC = this.suitService.suit.waistcoat;
    this.addCoat = this.suitService.suit.coat;
    this.addPants = this.suitService.suit.extra_pants;
    this.coatPrice = this.suitService.product.price * 0.9;
    this.wcPrice = this.suitService.product.price * 0.5;
    this.pantsPrice = this.suitService.product.price * 0.18;
    // this.comments = this.measurementsService.comments;
    // this.buttons = this.suitService.suit.buttons.value;
    // this.button_stitching = this.suitService.suit.button_stitching.value;
    // this.selectedOption = this.suitService.suit.contrast_package.value;
    // this.contrast_fabric = this.suitService.suit.contrast_package.colour;

    // this.suitService.suit.buttons.value = this.buttons;
    // this.suitService.suit.button_stitching.value = this.button_stitching;
    // this.suitService.suit.contrast_package.value = this.selectedOption;
    // this.suitService.suit.contrast_package.colour = this.contrast_fabric;
    this.calcMockup();
    this.calcPrice();
    setTimeout(()=> {
      this.loading = false;
    }, 1);

    this.completed0 = false;
  }

  ngOnInit() {
    this.selectedOption = this.options[0];
  }

  addMockup() {
    // alert("YES");
    this.suitService.suit.mockup = this.mockup;
    this.calcPrice();
  }


  addedWC() {
    // alert("YES");
    this.suitService.suit.waistcoat = this.addWC;
    this.calcMockup();
    this.calcPrice();
  }

  addedPants() {
    // alert("YES");
    this.suitService.suit.extra_pants = this.addPants;
    this.calcMockup();
    this.calcPrice();
  }
  addedCoat() {
    // alert("YES");
    this.suitService.suit.coat = this.addCoat;
    this.calcMockup();
    this.calcPrice();
  }

  calcMockup() {
    let currentPrice = 750;
    if(this.addWC) {
      currentPrice += 750 * 0.18;
    }

    if(this.addCoat) {
      currentPrice += 750 * 0.8;
    }
    this.mockupPrice = currentPrice;
  }

  changeStep(s){
    for(let step of this.steps) {
      step.display = "none";
    }

    this.steps[s].display = 'block';
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#stepper'+s);
    this.pageScrollService.start(pageScrollInstance);
  }

  completeExtras() {
      let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({document: this.document, scrollTarget: '#tabTitle', pageScrollDuration: 0.3});
      // this.measurementsService.comments = this.comments;
      this.pageScrollService.start(pageScrollInstance);
      setTimeout(()=> {
        this.service.changeTab("measurements");
      }, 0.32)
  }

  calcPrice() {
    let price = this.suitService.product.price;
    
    if(this.suitService.suit.pants === null) {
      price = price * 0.8;
    }
    //Mockup garment
    if(this.mockup) {
      price += this.mockupPrice;
    }

    //Oversize
    if(this.suitService.suit.oversize) {
      price += this.suitService.product.price * 0.06;
    } else if (this.suitService.suit.supersize) {
      price += this.suitService.product.price * 0.1;
    }

    if(this.addWC) {
      price += this.wcPrice;
    }
    
    if(this.addCoat) {
      price += this.coatPrice;
    }
    
    if(this.addPants) {
      price += this.pantsPrice;
    }

    this.subtotal = price;
  }

}
