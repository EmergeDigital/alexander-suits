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
    { "name": "Long", "desc": "Long", "url": "assets/shirt-builder/buttons/buttons-v1.png" },
    { "name": "Short", "desc": "Short", "url": "assets/shirt-builder/buttons/buttons-v2.png" },
  ];
  
  public cuffsMock: any[] = [
    { "name": "1", "desc": "Fake button holes","url": "assets/shirt-builder/buttons/buttons-v1.png" },
    { "name": "2", "desc": "Working button holes", "url": "assets/shirt-builder/buttons/buttons-v2.png" },
    { "name": "3", "desc": "Working button holes", "url": "assets/shirt-builder/buttons/buttons-v2.png" },
    { "name": "4", "desc": "Working button holes", "url": "assets/shirt-builder/buttons/buttons-v2.png" },
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
