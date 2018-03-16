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
  
  private FinerDetailsStage = FinerDetailsStage;

  private buttonHolesMock: any[] = [
    { "name": "Faking", "desc": "A faking button holes style.", "url": "assets/suit-builder/buttons/buttons-v1.png" },
    { "name": "Working", "desc": "A working button holes style.", "url": "assets/suit-builder/buttons/buttons-v2.png" },
  ];
  
  private boutonneriesMock: any[] = [
    { "name": "Faking", "desc": "A faking button hole in the lapel style.", "url": "" },
    { "name": "Working", "desc": "A working button hole in the lapel style.", "url": "" },
  ];
  
  private lastButtonSleevesMock: any[] = [
    { "name": "Faking", "desc": "A faking button hole in the cuff style.", "url": "" },
    { "name": "Working", "desc": "A working button hole in the cuff style.", "url": "" },
  ];

  private errorMessage: string = "";

  private selectedButtonHole: any = {};
  private isSelectedButtonHole: boolean = false;  

  private selectedBoutonnerie: any = {};
  private isSelectedBoutonnerie: boolean = false;  

  private selectedLastButtonSleeve: any = {};
  private isSelectedLastButtonSleeve: boolean = false;  

  constructor(private suitBuilderService: SuitBuilderService) { }

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
    this.suitBuilderService.SetWizardStage.emit(WizardStage.Design);
  }

  private Next(): void {
    this.suitBuilderService.suit.buttonHole = this.selectedButtonHole;
    this.suitBuilderService.suit.boutonnerie = this.selectedBoutonnerie;
    this.suitBuilderService.suit.lastButtonSleeve = this.selectedLastButtonSleeve;
    
    this.suitBuilderService.isButtonHoleSelected = this.isSelectedButtonHole;
    this.suitBuilderService.isBoutonnerieSelected = this.isSelectedBoutonnerie;
    this.suitBuilderService.isLastButtonSleeveSelected = this.isSelectedLastButtonSleeve;

    this.suitBuilderService.SetFinerDetailsStage.emit(FinerDetailsStage.PackageStitching);
  }
}
