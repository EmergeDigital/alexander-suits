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
    { "name": "Standard", "desc": "Our shirts come standard with our off- white shell button.","url": "" },
    { "name": "Choose Colour", "desc": "Choose colour below", "url": "" },
  ];

  public boutonneriesMock: any[] = [
    { "name": "Standard", "desc": "Our button holes automatically come tone in tone with the fabric.", "url": "" },
    { "name": "Choose Colour", "desc": "Choose colour below", "url": "" },
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

  constructor(public shirtBuilderService: ShirtBuilderService) { }

  public ngOnInit(): void {
    this.selectedButtonHole = this.shirtBuilderService.suit.buttonHole;
    this.selectedBoutonnerie = this.shirtBuilderService.suit.boutonnerie;

    this.isSelectedButtonHole = this.shirtBuilderService.isButtonHoleSelected;
    this.isSelectedBoutonnerie = this.shirtBuilderService.isBoutonnerieSelected;
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

  public Previous(): void {
    this.shirtBuilderService.SetWizardStage.emit(WizardStage.Design);
  }

  public Next(): void {
    this.shirtBuilderService.suit.buttonHole = this.selectedButtonHole;
    this.shirtBuilderService.suit.boutonnerie = this.selectedBoutonnerie;

    this.shirtBuilderService.isButtonHoleSelected = this.isSelectedButtonHole;
    this.shirtBuilderService.isBoutonnerieSelected = this.isSelectedBoutonnerie;

    this.shirtBuilderService.SetFinerDetailsStage.emit(FinerDetailsStage.PackageStitching);
  }
}
