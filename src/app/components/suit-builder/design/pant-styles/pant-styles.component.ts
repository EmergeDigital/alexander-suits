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
    {"name": "NAME", "desc": "Pleat Description", "price": "200", "url": "assets/suit-builder/pants/pants-v1.png"},
    {"name": "NAME", "desc": "Pleat Description", "price": "200", "url": "assets/suit-builder/pants/pants-v2.png"},
    {"name": "NAME", "desc": "Pleat Description", "price": "200", "url": "assets/suit-builder/pants/pants-v3.png"},
  ];

  private pantPocketsMock: any[] = [
    {"name": "NAME", "desc": "Pocket Description", "price": "200", "url": "assets/suit-builder/pants/pants-v1.png"},
    {"name": "NAME", "desc": "Pocket Description", "price": "200", "url": "assets/suit-builder/pants/pants-v2.png"},
    {"name": "NAME", "desc": "Pocket Description", "price": "200", "url": "assets/suit-builder/pants/pants-v3.png"},
  ];

  private pantCuffsMock: any[] = [
    {"name": "NAME", "desc": "Cuff Description", "price": "200", "url": "assets/suit-builder/pants/pants-v1.png"},
    {"name": "NAME", "desc": "Cuff Description", "price": "200", "url": "assets/suit-builder/pants/pants-v2.png"},
    {"name": "NAME", "desc": "Cuff Description", "price": "200", "url": "assets/suit-builder/pants/pants-v3.png"},
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
