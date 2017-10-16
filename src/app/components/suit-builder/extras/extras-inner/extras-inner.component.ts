import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';

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
  selectedOption: string = "";
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

  constructor(private service: TabsService, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {

    this.steps = [];
    this.stepsLength = 5;
    this.steps.push({display: "block"});
    for(let i = 1; i < this.stepsLength; i++) {
      this.steps.push({display: "none"});
    }

    this.completed0 = false;
  }

  ngOnInit() {
    this.selectedOption = this.options[0];
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
      this.pageScrollService.start(pageScrollInstance);
      setTimeout(()=> {
        this.service.changeTab("measurements");
      }, 0.32)
  }

}
