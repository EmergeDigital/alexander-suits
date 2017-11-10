import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import {TabsService} from '../../../../services/tabs.service';
import {DataService} from '../../../../services/data.service';
import { TdLoadingService } from '@covalent/core';
import { Router } from '@angular/router';
import {SuitService} from "./../../../../services/customizers/suit.service";
import {MeasurementsService} from "./../../../../services/customizers/measurements.service";

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


    @ViewChild('basicContainer')
    public basicContainer: ElementRef;

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
      {img: "assets/measurements/1-slender.png", id: 0, title: "Slender", desc: "Skinny figure with small waist"},

      {img: "assets/measurements/2-Slender-with-slight-belly.png", id: 1, title: "Slender with slight belly", desc: "Skinny figure with a bit of fat around the edges"},

      {img: "assets/measurements/3-Slender-Athletic.png", id: 2, title: "Slender, Athletic", desc: "Althetic figure with small amount of muscle mass"},

      {img: "assets/measurements/4-Rounder-Figure.png", id: 3, title: "Rounder Figure", desc: "Rectangular body figure"},

      {img: "assets/measurements/5-Rounder-Figure-with-large-stomach.png", id: 4, title: "Rounder Figure with large stomach", desc: "Large body mass with protruding stomach"},

      {img: "assets/measurements/6-Compact-with-Stomach.png", id: 5, title: "Compact with Stomach", desc: "A muscular, strong figure with higher body fat"},

      {img: "assets/measurements/7-Compact-Athletic-Chest.png", id: 6, title: "Compact, Athletic Chest", desc: "A muscular, strong figure with low body fat"},
    ];

    constructor(private service: TabsService, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any, 
                public router: Router, public data: DataService, private _loadingService: TdLoadingService, public suitService: SuitService,
                public measurementsService: MeasurementsService) {
      this.steps = [];
      this.stepsLength = 3;
      this.steps.push({display: "block"});
      if(suitService.suit.pants === null) {
        this.hasTrousers = false;
      } else {
        this.hasTrousers = true;
      }
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

    uploadImg: any = {};
    uploadMsg: string = '';
    uploading: boolean = false;
    imageUploaded: string = '';
    canAddChips: boolean = false;
 
    selectEvent(file: File): void {
      this.uploadImg = file;
      this.uploadMsg = "File selected";
    }

    cancelEvent(): void {
      this.uploadImg = {};
      this.uploadMsg = '';
    }
 
    next() {
      this._loadingService.register('overlayStarSyntax');
      // console.log(this.uploadImg);
      if(this.uploadMsg === "File selected") {
        this.uploading = true;
        // this.fileUploading = "Uploading now, please wait.";
        this.data.uploadImage(this.uploadImg).then(response=>{
          // console.log(response);
          //Store this image
          this.imageUploaded = response;
          this.uploading = false;
          this.uploadMsg = '';
          this.uploadImg = {};
          // this.fileUploading = "";
          this.checkout();
        }).catch(ex => {
          alert("An error occurred, please try again");
          this._loadingService.resolve('overlayStarSyntax');
          console.log(ex);
        });
      } else {
        this.checkout();
      }
    }

    confirmBodyType() {
      this.stepperHidden = false;
      setTimeout(()=> {
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#stepper1');
        this.pageScrollService.start(pageScrollInstance);        
      }, 100)
    }

    changeStep(s){
      for(let step of this.steps) {
        step.display = "none";
      }

      this.steps[s].display = 'block';
      setTimeout(()=> {
        // let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({document: this.document, scrollTarget: '#stepper'+s, scrollingViews: [this.container.nativeElement]});
        // this.pageScrollService.start(pageScrollInstance);

        const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
          document: this.document,
          scrollTarget: '#stepper' + s,
          scrollingViews: [this.basicContainer.nativeElement]
        });
        this.pageScrollService.start(pageScrollInstance);
        console.log("scrolling to " + s);
        // let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#stepper'+s);
        // this.pageScrollService.start(pageScrollInstance);   
      }, 1000)
    }

    checkout() {
      this._loadingService.register('overlayStarSyntax');
      //Save user measurements
      this.measurementsService.storeMeasurements(this.measurements);
      //Add suit to cart
      let product = this.suitService.processSuit();
      console.log(product);
      // this._loadingService.resolve('overlayStarSyntax')
      this.data.addToCart([product]).then(result => {
        console.log(result);
        this._loadingService.resolve('overlayStarSyntax');
        this.router.navigate(['/checkout']);
      }).catch(ex => {
        alert("There was a problem");
        this._loadingService.resolve('overlayStarSyntax');
      })
      // console.log("completed");
    }

    oversizeText(){
      if(this.measurements.chest > 135 || this.measurements.waist > 121) {
        this.suitService.suit.supersize = true;
        return "An oversize charge of 10% (R" + this.suitService.product.price *0.1 + ") needs to be added";
      } else if(this.measurements.chest > 128 || this.measurements.waist > 112){
        this.suitService.suit.oversize = true;
        return "An oversize charge of 6% (R" + this.suitService.product.price *0.06 + ") needs to be added";
      } else {
        return "";
      }
    }

}
