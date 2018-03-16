import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { DesignStage } from '../../../../models/suit-builder/designStage';

@Component({
  selector: 'suit-builder-design-pant-styles',
  templateUrl: './pant-styles.component.html',
  styleUrls: ['./pant-styles.component.scss']
})
export class PantStylesComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  private DesignStage = DesignStage;

  private pantPleatsMock: any[] = [
    {"name": "Flat", "desc": "A flat front style.", "url": ""},
    {"name": "Dart", "desc": "A single darted front style. ", "url": "assets/suit-builder/pants/pants-v1.png"},
    {"name": "Single", "desc": "A single pleated front style", "url": "assets/suit-builder/pants/pants-v3.png"},
    {"name": "Double", "desc": "A double pleated front style", "url": "assets/suit-builder/pants/pants-v2.png"},
  ];

  private pantPocketsMock: any[] = [
    {"name": "None", "desc": "A no pocket style.", "url": ""},
    {"name": "One", "desc": "A one pocket style.", "url": ""},
    {"name": "Two", "desc": "A two pockets style.", "url": ""},
  ];

  private pantCuffsMock: any[] = [
    {"name": "None", "desc": "A seem cuff without turnups style.", "url": ""},
    {"name": "Turnups", "desc": "A seem cuff with turnups style.", "url": ""},
  ];

  private errorMessage: string = "";

  private selectedPantPleat: any = {};
  private isSelectedPantPleat: boolean = false;
  
  private selectedPantPocket: any = {};
  private isSelectedPantPocket: boolean = false;
  
  private selectedPantCuff: any = {};
  private isSelectedPantCuff: boolean = false;

  private currentSuit: any = {};

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.suitBuilderService.suit;
    this.selectedPantPleat = this.suitBuilderService.suit.pantPleat;
    this.selectedPantPocket = this.suitBuilderService.suit.pantBackPocket;
    this.selectedPantCuff = this.suitBuilderService.suit.pantCuff;
    
    this.isSelectedPantPleat = this.suitBuilderService.isPantPleatSelected;
    this.isSelectedPantPocket = this.suitBuilderService.isPantPocketSelected;
    this.isSelectedPantCuff = this.suitBuilderService.isPantCuffSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private GetPantPocketBackgroundSelected(): string {
    var ret = "";

    if (this.isSelectedPantPleat)
      ret = 'url(' + this.selectedPantPleat.url + '),';

    if (this.isSelectedPantPocket)
      ret = ret + ' url(' + this.selectedPantPocket.url + '),';
      
    return ret + ' url("assets/suit-builder/pants-base.png")';
  }

  private GetPantCuffBackgroundSelected(): string {
    var ret = "";

    if (this.isSelectedPantPleat)
      ret = 'url(' + this.selectedPantPleat.url + '),';

    if (this.isSelectedPantPocket)
      ret = ret + ' url(' + this.selectedPantPocket.url + '),';

      if (this.isSelectedPantPocket)
        ret = ret + ' url(' + this.selectedPantCuff.url + '),';
      
    return ret + ' url("assets/suit-builder/pants-base.png")';
  }

  private SelectPantPleat(pantPleat: any) {
    this.selectedPantPleat = pantPleat;
    this.isSelectedPantPleat = true;
  }

  private SelectPantPocket(pantPocket: any) {
    this.selectedPantPocket = pantPocket;
    this.isSelectedPantPocket = true;
  }

  private SelectPantCuff(pantCuff: any) {
    this.selectedPantCuff = pantCuff;
    this.isSelectedPantCuff = true;
  }

  private Previous() {
    this.suitBuilderService.SetDesignStage.emit(DesignStage.Vents);
  }

  private Next() {
    this.suitBuilderService.suit.pantPleat = this.selectedPantPleat;
    this.suitBuilderService.suit.pantBackPocket = this.selectedPantPocket;
    this.suitBuilderService.suit.pantCuff = this.selectedPantCuff;

    this.suitBuilderService.isPantPleatSelected = this.isSelectedPantPleat;
    this.suitBuilderService.isPantPocketSelected = this.isSelectedPantPocket;
    this.suitBuilderService.isPantCuffSelected = this.isSelectedPantCuff;
    
    this.suitBuilderService.SetDesignStage.emit(DesignStage.Addons);
  }
}
