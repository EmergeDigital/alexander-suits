import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { JacketBuilderService } from '../../jacket-builder.service';
import { WizardStage } from '../../../../models/jacket-builder/wizardStage';
import { FinerDetailsStage } from '../../../../models/jacket-builder/finerDetailsStage';

@Component({
  selector: 'jacket-builder-finer-details-button-styles',
  templateUrl: './button-styles.component.html',
  styleUrls: ['./button-styles.component.scss']
})
export class ButtonStylesComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  public FinerDetailsStage = FinerDetailsStage;

  public buttonHolesMock: any[] = [
    { "name": "1", "desc": "Fake button holes", "url": "assets/jacket-builder/buttons/buttons-v1.png" },
    { "name": "2", "desc": "Working button holes", "url": "assets/jacket-builder/buttons/buttons-v2.png" },
  ];
  
  public boutonneriesMock: any[] = [
    { "name": "1", "desc": "Fake button holes", "url": "assets/jacket-builder/buttons/buttons-v1.png" },
    { "name": "2", "desc": "Working button holes", "url": "assets/jacket-builder/buttons/buttons-v2.png" },
  ];
  
  public lastButtonSleevesMock: any[] = [
    { "name": "1", "desc": "Fake button holes", "url": "assets/jacket-builder/buttons/buttons-v1.png" },
    { "name": "2", "desc": "Working button holes", "url": "assets/jacket-builder/buttons/buttons-v2.png" },
  ];

  public errorMessage: string = "";

  public selectedButtonHole: any = {};
  public isSelectedButtonHole: boolean = false;  

  public selectedBoutonnerie: any = {};
  public isSelectedBoutonnerie: boolean = false;  

  public selectedLastButtonSleeve: any = {};
  public isSelectedLastButtonSleeve: boolean = false;  

  constructor(public jacketBuilderService: JacketBuilderService) { }

  public ngOnInit(): void {
    this.selectedButtonHole = this.jacketBuilderService.suit.buttonHole;
    this.selectedBoutonnerie = this.jacketBuilderService.suit.boutonnerie;
    this.selectedLastButtonSleeve = this.jacketBuilderService.suit.lastButtonSleeve;

    this.isSelectedButtonHole = this.jacketBuilderService.isButtonHoleSelected;
    this.isSelectedBoutonnerie = this.jacketBuilderService.isBoutonnerieSelected;
    this.isSelectedLastButtonSleeve = this.jacketBuilderService.isLastButtonSleeveSelected;
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
    this.jacketBuilderService.SetWizardStage.emit(WizardStage.Design);
  }

  public Next(): void {
    this.jacketBuilderService.suit.buttonHole = this.selectedButtonHole;
    this.jacketBuilderService.suit.boutonnerie = this.selectedBoutonnerie;
    this.jacketBuilderService.suit.lastButtonSleeve = this.selectedLastButtonSleeve;
    
    this.jacketBuilderService.isButtonHoleSelected = this.isSelectedButtonHole;
    this.jacketBuilderService.isBoutonnerieSelected = this.isSelectedBoutonnerie;
    this.jacketBuilderService.isLastButtonSleeveSelected = this.isSelectedLastButtonSleeve;

    this.jacketBuilderService.SetFinerDetailsStage.emit(FinerDetailsStage.PackageStitching);
  }
}
