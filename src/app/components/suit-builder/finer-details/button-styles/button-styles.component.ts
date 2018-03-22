import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';
import { FinerDetailsStage } from '../../../../models/suit-builder/finerDetailsStage';

@Component({
  selector: 'suit-builder-finer-details-button-styles',
  templateUrl: './button-styles.component.html',
  styleUrls: ['./button-styles.component.scss']
})
export class ButtonStylesComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  public FinerDetailsStage = FinerDetailsStage;

  public buttonHolesMock: any[] = [
    { "name": "Faking", "desc": "A faking button holes style.", "url": "assets/suit-builder/buttons/buttons-v1.png" },
    { "name": "Working", "desc": "A working button holes style.", "url": "assets/suit-builder/buttons/buttons-v2.png" },
  ];
  
  public boutonneriesMock: any[] = [
    { "name": "Faking", "desc": "A faking button hole in the lapel style.", "url": "" },
    { "name": "Working", "desc": "A working button hole in the lapel style.", "url": "" },
  ];
  
  public lastButtonSleevesMock: any[] = [
    { "name": "Faking", "desc": "A faking button hole in the cuff style.", "url": "" },
    { "name": "Working", "desc": "A working button hole in the cuff style.", "url": "" },
  ];

  public errorMessage: string = "";

  public selectedButtonHole: any = {};
  public isSelectedButtonHole: boolean = false;  

  public selectedBoutonnerie: any = {};
  public isSelectedBoutonnerie: boolean = false;  

  public selectedLastButtonSleeve: any = {};
  public isSelectedLastButtonSleeve: boolean = false;  

  constructor(public suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.selectedButtonHole = this.suitBuilderService.suit.buttonHole;
    this.selectedBoutonnerie = this.suitBuilderService.suit.boutonnerie;
    this.selectedLastButtonSleeve = this.suitBuilderService.suit.lastButtonSleeve;

    this.isSelectedButtonHole = this.suitBuilderService.isButtonHoleSelected;
    this.isSelectedBoutonnerie = this.suitBuilderService.isBoutonnerieSelected;
    this.isSelectedLastButtonSleeve = this.suitBuilderService.isLastButtonSleeveSelected;
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
    this.suitBuilderService.SetWizardStage.emit(WizardStage.Design);
  }

  public Next(): void {
    this.suitBuilderService.suit.buttonHole = this.selectedButtonHole;
    this.suitBuilderService.suit.boutonnerie = this.selectedBoutonnerie;
    this.suitBuilderService.suit.lastButtonSleeve = this.selectedLastButtonSleeve;
    
    this.suitBuilderService.isButtonHoleSelected = this.isSelectedButtonHole;
    this.suitBuilderService.isBoutonnerieSelected = this.isSelectedBoutonnerie;
    this.suitBuilderService.isLastButtonSleeveSelected = this.isSelectedLastButtonSleeve;

    this.suitBuilderService.SetFinerDetailsStage.emit(FinerDetailsStage.PackageStitching);
  }
}
