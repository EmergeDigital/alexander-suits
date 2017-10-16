import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import {TabsService} from '../../../../services/tabs.service';

@Component({
  selector: 'app-measurements-inner',
  templateUrl: './measurements-inner.component.html',
  styleUrls: ['./measurements-inner.component.scss']
})
export class MeasurementsInnerComponent implements OnInit {

    stepsLength: number;
    steps: any[];
    completed0: boolean;
    measurements: any = {};
    stepperHidden: boolean = true;
    hasJacket: boolean = true;
    hasTrousers: boolean = true;

    config: SwiperOptions = {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        loop: true,
        freeModeSticky: true
    };

    body_types: any[] = [
      {img: "assets/measurements/1-slender.png", id: 0, title: "Slender", desc: "blah blah youre skinny etc"},

      {img: "assets/measurements/2-Slender-with-slight-belly.png", id: 1, title: "Slender with slight belly", desc: "blah blah youre skinny fat"},

      {img: "assets/measurements/3-Slender-Athletic.png", id: 2, title: "Slender, Athletic", desc: "still skinny but not as bad"},

      {img: "assets/measurements/4-Rounder-Figure.png", id: 3, title: "Rounder Figure", desc: "blubbery boi"},

      {img: "assets/measurements/5-Rounder-Figure-with-large-stomach.png", id: 4, title: "Rounder Figure with large stomach", desc: "blah blah youre fat etc"},

      {img: "assets/measurements/6-Compact-with-Stomach.png", id: 5, title: "Compact with Stomach", desc: "getting stonk but still kinda fat"},

      {img: "assets/measurements/7-Compact-Athletic-Chest.png", id: 6, title: "Compact, Athletic Chest", desc: "welcome to the world of aesthetics"},
    ];

    constructor(private service: TabsService, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
      this.steps = [];
      this.stepsLength = 3;
      this.steps.push({display: "block"});
      for(let i = 1; i < this.stepsLength; i++) {
        this.steps.push({display: "none"});
      }

      this.completed0 = false;
    }

    test(id) {
      console.log(id);
    }

    ngOnInit() {
    }

    confirmBodyType() {
      this.stepperHidden = false;
      setTimeout(()=> {
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#stepper1');
        this.pageScrollService.start(pageScrollInstance);        
      }, 0.1)
    }

    changeStep(s){
      for(let step of this.steps) {
        step.display = "none";
      }

      this.steps[s].display = 'block';
      let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#stepper'+s);
      this.pageScrollService.start(pageScrollInstance);
    }

    checkout() {
        console.log("completed");
    }

}
