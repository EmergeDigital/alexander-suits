import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { ShirtBuilderService } from '../../shirt-builder.service';
import { WizardStage } from '../../../../models/shirt-builder/wizardStage';
import { DesignStage } from '../../../../models/shirt-builder/designStage';

@Component({
  selector: 'shirt-builder-design-sleeve',
  templateUrl: './sleeve.component.html',
  styleUrls: ['./sleeve.component.scss']
})
export class SleeveComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  public DesignStage = DesignStage;

  public sleevesMock: any[] = [
    { "name": "Long", "desc": "Long Sleeve Shirt", "url": "" },
    { "name": "Short", "desc": "Short Sleeve Shirt", "url": "" },
  ];
  
  public cuffsMock: any[] = [
    { "name": "Single Cuff with 2 buttons, angular.", "desc": "The most popular of our cuffs. The 2 longitudinal button setup allows to elegantly adjust the width of the cuff, for example in order to accommodate a wrist watch.","url": "" },
    { "name": "Single Cuff with 2 buttons, square.", "desc": "Same as MA100 with square finish. A very fashionable finish that is not to found very often.", "url": "" },
    { "name": "Single Cuff with 1 button, rounded.", "desc": "A beautiful and unpretentious cuff, especially for casual shirts.", "url": "" },
    { "name": "Double Cuff.", "desc": "Also called French Cuffs. This elegant cuff is twice as long as the normal cuffs (hence the name) and then folded back. It is tied with cufflinks, instead of buttons.", "url": "" },
  ];

  public errorMessage: string = "";

  public selectedSleeve: any = {};
  public isSelectedSleeve: boolean = false;  

  public selectedCuff: any = {};
  public isSelectedCuff: boolean = false;  

  public currentSuit: any = {};

  constructor(public shirtBuilderService: ShirtBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.shirtBuilderService.suit;
    
    this.selectedSleeve = this.shirtBuilderService.suit.sleve;
    this.selectedCuff = this.shirtBuilderService.suit.cuff;

    this.isSelectedSleeve = this.shirtBuilderService.isSleeveSelected;
    this.isSelectedCuff = this.shirtBuilderService.isCuffSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public SelectSleeve(sleeve: any) {
    this.selectedSleeve = sleeve;
    this.isSelectedSleeve = true;
  }

  public SelectCuff(cuff: any) {
    this.selectedCuff = cuff;
    this.isSelectedCuff = true;
  }

  public Previous(): void {
    this.shirtBuilderService.SetDesignStage.emit(DesignStage.Collar);
  }

  public Next(): void {
    this.shirtBuilderService.suit.sleeve = this.selectedSleeve;
    this.shirtBuilderService.suit.cuff = this.selectedCuff;
    
    this.shirtBuilderService.isSleeveSelected = this.isSelectedSleeve;
    this.shirtBuilderService.isCuffSelected = this.isSelectedCuff;

    this.shirtBuilderService.SetDesignStage.emit(DesignStage.Shirt);
  }
}
