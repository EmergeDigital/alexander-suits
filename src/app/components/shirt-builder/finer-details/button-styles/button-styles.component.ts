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
  
  public FinerDetailsStage = FinerDetailsStage;

  public buttonHolesMock: any[] = [
    { "name": "1", "desc": "Fake button holes","url": "assets/shirt-builder/buttons/buttons-v1.png" },
    { "name": "2", "desc": "Working button holes", "url": "assets/shirt-builder/buttons/buttons-v2.png" },
  ];
  
  public boutonneriesMock: any[] = [
    { "name": "1", "desc": "Fake button holes", "url": "assets/shirt-builder/buttons/buttons-v1.png" },
    { "name": "2", "desc": "Working button holes", "url": "assets/shirt-builder/buttons/buttons-v2.png" },
  ];
  
  public lastButtonSleevesMock: any[] = [
    { "name": "1", "desc": "Fake button holes", "url": "assets/shirt-builder/buttons/buttons-v1.png" },
    { "name": "2", "desc": "Working button holes", "url": "assets/shirt-builder/buttons/buttons-v2.png" },
  ];

  public errorMessage: string = "";

  public selectedButtonHole: any = {};
  public isSelectedButtonHole: boolean = false;  

  public selectedBoutonnerie: any = {};
  public isSelectedBoutonnerie: boolean = false;  

  public selectedLastButtonSleeve: any = {};
  public isSelectedLastButtonSleeve: boolean = false;  

  constructor(public shirtBuilderService: ShirtBuilderService) { }

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

  public SelectButtonHole(buttonHole: any) {
    this.selectedButtonHole = buttonHole;
    this.isSelectedButtonHole = true;
  }

  public SelectBoutonnerie(boutonnerie: any) {
    this.selectedBoutonnerie = boutonnerie;
    this.isSelectedBoutonnerie = true;
  }

  public SelectLastButtonSleeve(lastButtonSleeve: any) {
    this.selectedLastButtonSleeve = lastButtonSleeve;
    this.isSelectedLastButtonSleeve = true;
  }

  public Previous(): void {
    this.shirtBuilderService.SetWizardStage.emit(WizardStage.Design);
  }

  public Next(): void {
    this.shirtBuilderService.suit.buttonHole = this.selectedButtonHole;
    this.shirtBuilderService.suit.boutonnerie = this.selectedBoutonnerie;
    this.shirtBuilderService.suit.lastButtonSleeve = this.selectedLastButtonSleeve;
    
    this.shirtBuilderService.isButtonHoleSelected = this.isSelectedButtonHole;
    this.shirtBuilderService.isBoutonnerieSelected = this.isSelectedBoutonnerie;
    this.shirtBuilderService.isLastButtonSleeveSelected = this.isSelectedLastButtonSleeve;

    this.shirtBuilderService.SetFinerDetailsStage.emit(FinerDetailsStage.PackageStitching);
  }
}
