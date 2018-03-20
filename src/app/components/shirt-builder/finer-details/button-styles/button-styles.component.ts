import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { ShirtBuilderService } from '../../shirt-builder.service';
import { WizardStage } from '../../../../models/shirt-builder/wizardStage';
import { FinerDetailsStage } from '../../../../models/shirt-builder/finerDetailsStage';

@Component({
  selector: 'shirt-builder-finer-details-button-styles',
  templateUrl: './button-styles.component.html',
  styleUrls: ['./button-styles.component.scss']
})
export class ButtonStylesComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  private FinerDetailsStage = FinerDetailsStage;

  private buttonHolesMock: any[] = [
    { "name": "Standard", "desc": "Our shirts come standard with our off- white shell button.","url": "" },
    { "name": "Choose Colour", "desc": "Choose colour below", "url": "" },
  ];
  
  private boutonneriesMock: any[] = [
    { "name": "Standard", "desc": "Our button holes automatically come tone in tone with the fabric.", "url": "" },
    { "name": "Choose Colour", "desc": "Choose colour below", "url": "" },
  ];
  
  private lastButtonSleevesMock: any[] = [
    { "name": "1", "desc": "Fake button holes", "url": "assets/shirt-builder/buttons/buttons-v1.png" },
    { "name": "2", "desc": "Working button holes", "url": "assets/shirt-builder/buttons/buttons-v2.png" },
  ];

  private errorMessage: string = "";

  private selectedButtonHole: any = {};
  private isSelectedButtonHole: boolean = false;  

  private selectedBoutonnerie: any = {};
  private isSelectedBoutonnerie: boolean = false;  

  private selectedLastButtonSleeve: any = {};
  private isSelectedLastButtonSleeve: boolean = false;  

  constructor(private shirtBuilderService: ShirtBuilderService) { }

  public ngOnInit(): void {
    this.selectedButtonHole = this.shirtBuilderService.suit.buttonHole;
    this.selectedBoutonnerie = this.shirtBuilderService.suit.boutonnerie;
    this.selectedLastButtonSleeve = this.shirtBuilderService.suit.lastButtonSleeve;

    this.isSelectedButtonHole = this.shirtBuilderService.isButtonHoleSelected;
    this.isSelectedBoutonnerie = this.shirtBuilderService.isBoutonnerieSelected;
    this.isSelectedLastButtonSleeve = this.shirtBuilderService.isLastButtonSleeveSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private SelectButtonHole(buttonHole: any) {
    this.selectedButtonHole = buttonHole;
    this.isSelectedButtonHole = true;
  }

  private SelectBoutonnerie(boutonnerie: any) {
    this.selectedBoutonnerie = boutonnerie;
    this.isSelectedBoutonnerie = true;
  }

  private SelectLastButtonSleeve(lastButtonSleeve: any) {
    this.selectedLastButtonSleeve = lastButtonSleeve;
    this.isSelectedLastButtonSleeve = true;
  }

  private Previous(): void {
    this.shirtBuilderService.SetWizardStage.emit(WizardStage.Design);
  }

  private Next(): void {
    this.shirtBuilderService.suit.buttonHole = this.selectedButtonHole;
    this.shirtBuilderService.suit.boutonnerie = this.selectedBoutonnerie;
    this.shirtBuilderService.suit.lastButtonSleeve = this.selectedLastButtonSleeve;
    
    this.shirtBuilderService.isButtonHoleSelected = this.isSelectedButtonHole;
    this.shirtBuilderService.isBoutonnerieSelected = this.isSelectedBoutonnerie;
    this.shirtBuilderService.isLastButtonSleeveSelected = this.isSelectedLastButtonSleeve;

    this.shirtBuilderService.SetFinerDetailsStage.emit(FinerDetailsStage.PackageStitching);
  }
}
