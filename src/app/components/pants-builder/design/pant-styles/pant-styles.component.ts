import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { PantsBuilderService } from '../../pants-builder.service';
import { WizardStage } from '../../../../models/pants-builder/wizardStage';

@Component({
  selector: 'pants-builder-design-pant-styles',
  templateUrl: './pant-styles.component.html',
  styleUrls: ['./pant-styles.component.scss']
})
export class PantStylesComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  public pantPleatsMock: any[] = [
    {"name": "1", "desc": "Collar Description", "url": "assets/pants-builder/pants/pants-v1.png"},
    {"name": "2", "desc": "Collar Description", "url": "assets/pants-builder/pants/pants-v2.png"},
    {"name": "3", "desc": "Collar Description", "url": "assets/pants-builder/pants/pants-v3.png"},
  ];

  public pantPocketsMock: any[] = [
    {"name": "1", "desc": "Collar Description", "url": "assets/pants-builder/pants/pants-v1.png"},
    {"name": "2", "desc": "Collar Description", "url": "assets/pants-builder/pants/pants-v2.png"},
    {"name": "3", "desc": "Collar Description", "url": "assets/pants-builder/pants/pants-v3.png"},
  ];

  public pantCuffsMock: any[] = [
    {"name": "1", "desc": "Collar Description", "url": "assets/pants-builder/pants/pants-v1.png"},
    {"name": "2", "desc": "Collar Description", "url": "assets/pants-builder/pants/pants-v2.png"},
    {"name": "3", "desc": "Collar Description", "url": "assets/pants-builder/pants/pants-v3.png"},
  ];

  public errorMessage: string = "";

  public selectedPantPleat: any = {};
  public isSelectedPantPleat: boolean = false;
  
  public selectedPantPocket: any = {};
  public isSelectedPantPocket: boolean = false;
  
  public selectedPantCuff: any = {};
  public isSelectedPantCuff: boolean = false;

  public currentSuit: any = {};

  constructor(public pantsBuilderService: PantsBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.pantsBuilderService.suit;
    this.selectedPantPleat = this.pantsBuilderService.suit.pantPleat;
    this.selectedPantPocket = this.pantsBuilderService.suit.pantBackPocket;
    this.selectedPantCuff = this.pantsBuilderService.suit.pantCuff;
    
    this.isSelectedPantPleat = this.pantsBuilderService.isPantPleatSelected;
    this.isSelectedPantPocket = this.pantsBuilderService.isPantPocketSelected;
    this.isSelectedPantCuff = this.pantsBuilderService.isPantCuffSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public SelectPantPleat(pantPleat: any) {
    this.selectedPantPleat = pantPleat;
    this.isSelectedPantPleat = true;
  }

  public SelectPantPocket(pantPocket: any) {
    this.selectedPantPocket = pantPocket;
    this.isSelectedPantPocket = true;
  }

  public SelectPantCuff(pantCuff: any) {
    this.selectedPantCuff = pantCuff;
    this.isSelectedPantCuff = true;
  }

  public Previous() {
    this.pantsBuilderService.SetWizardStage.emit(WizardStage.Fabric);
  }

  public Next() {
    this.pantsBuilderService.suit.pantPleat = this.selectedPantPleat;
    this.pantsBuilderService.suit.pantBackPocket = this.selectedPantPocket;
    this.pantsBuilderService.suit.pantCuff = this.selectedPantCuff;

    this.pantsBuilderService.isPantPleatSelected = this.isSelectedPantPleat;
    this.pantsBuilderService.isPantPocketSelected = this.isSelectedPantPocket;
    this.pantsBuilderService.isPantCuffSelected = this.isSelectedPantCuff;
    
    this.pantsBuilderService.SetWizardStage.emit(WizardStage.Measurements);
  }
}
