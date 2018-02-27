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

  private pantPleatsMock: any[] = [
    {"name": "1", "desc": "Collar Description", "price": "200", "url": "assets/pants-builder/pants/pants-v1.png"},
    {"name": "2", "desc": "Collar Description", "price": "200", "url": "assets/pants-builder/pants/pants-v2.png"},
    {"name": "3", "desc": "Collar Description", "price": "200", "url": "assets/pants-builder/pants/pants-v3.png"},
  ];

  private pantPocketsMock: any[] = [
    {"name": "1", "desc": "Collar Description", "price": "200", "url": "assets/pants-builder/pants/pants-v1.png"},
    {"name": "2", "desc": "Collar Description", "price": "200", "url": "assets/pants-builder/pants/pants-v2.png"},
    {"name": "3", "desc": "Collar Description", "price": "200", "url": "assets/pants-builder/pants/pants-v3.png"},
  ];

  private pantCuffsMock: any[] = [
    {"name": "1", "desc": "Collar Description", "price": "200", "url": "assets/pants-builder/pants/pants-v1.png"},
    {"name": "2", "desc": "Collar Description", "price": "200", "url": "assets/pants-builder/pants/pants-v2.png"},
    {"name": "3", "desc": "Collar Description", "price": "200", "url": "assets/pants-builder/pants/pants-v3.png"},
  ];

  private errorMessage: string = "";

  private selectedPantPleat: any = {};
  private isSelectedPantPleat: boolean = false;
  
  private selectedPantPocket: any = {};
  private isSelectedPantPocket: boolean = false;
  
  private selectedPantCuff: any = {};
  private isSelectedPantCuff: boolean = false;

  private currentSuit: any = {};

  constructor(private pantsBuilderService: PantsBuilderService) { }

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
    this.pantsBuilderService.SetWizardStage.emit(WizardStage.Fabric);
  }

  private Next() {
    this.pantsBuilderService.suit.pantPleat = this.selectedPantPleat;
    this.pantsBuilderService.suit.pantBackPocket = this.selectedPantPocket;
    this.pantsBuilderService.suit.pantCuff = this.selectedPantCuff;

    this.pantsBuilderService.isPantPleatSelected = this.isSelectedPantPleat;
    this.pantsBuilderService.isPantPocketSelected = this.isSelectedPantPocket;
    this.pantsBuilderService.isPantCuffSelected = this.isSelectedPantCuff;
    
    this.pantsBuilderService.SetWizardStage.emit(WizardStage.Measurements);
  }
}
