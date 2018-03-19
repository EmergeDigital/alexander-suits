import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { ShirtBuilderService } from '../../shirt-builder.service';
import { FinerDetailsStage } from '../../../../models/shirt-builder/finerDetailsStage';
import { WizardStage } from '../../../../models/shirt-builder/wizardStage';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'shirt-builder-finer-details-package-stitching',
  templateUrl: './package-stitching.component.html',
  styleUrls: ['./package-stitching.component.scss']
})
export class PackageStitchingComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  public FinerDetailsStage = FinerDetailsStage;

  public contrastPackagesMock: any[] = [
    { "name": "1", "desc": "Fake button holes", "url": "assets/shirt-builder/buttons/buttons-v1.png" },
    { "name": "2", "desc": "Working button holes", "url": "assets/shirt-builder/buttons/buttons-v2.png" },
  ];

  public topStitchsMock: any[] = [
    { "name": "1", "desc": "Fake button holes", "url": "assets/shirt-builder/buttons/buttons-v1.png" },
    { "name": "2", "desc": "Working button holes", "url": "assets/shirt-builder/buttons/buttons-v2.png" },
  ];

  public errorMessage: string = "";

  public selectedConstrastPackage: any = {};
  public isSelectedConstrastPackage: boolean = false;

  public selectedTopStitch: any = {};
  public isSelectedTopStitch: boolean = false;

  public selectedContrastPackageColour: string = "";

  public currentSuit: any = {};

  constructor(public shirtBuilderService: ShirtBuilderService, public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.currentSuit = this.shirtBuilderService.suit;
    this.selectedConstrastPackage = this.shirtBuilderService.suit.contrastPackage;
    this.selectedTopStitch = this.shirtBuilderService.suit.topStitch;
    this.selectedContrastPackageColour = this.shirtBuilderService.suit.contrastPackageColour;

    this.isSelectedConstrastPackage = this.shirtBuilderService.isContrastPackageSelected;
    this.isSelectedTopStitch = this.shirtBuilderService.isTopStitchSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public SelectContrastPackage(constrastPackage: any) {
    this.selectedConstrastPackage = constrastPackage;
    this.isSelectedConstrastPackage = true;
  }

  public SelectTopStitch(topStitch: any) {
    this.selectedTopStitch = topStitch;
    this.isSelectedTopStitch = true;
  }

  public Previous() {
    this.shirtBuilderService.SetFinerDetailsStage.emit(FinerDetailsStage.ButtonStyles);
  }

  public Next() {
    this.shirtBuilderService.suit.contrastPackage = this.selectedConstrastPackage;
    this.shirtBuilderService.suit.topStitch = this.selectedTopStitch;
    this.shirtBuilderService.suit.contrastPackageColour = this.selectedContrastPackageColour;

    this.shirtBuilderService.isContrastPackageSelected = this.isSelectedConstrastPackage;
    this.shirtBuilderService.isTopStitchSelected = this.isSelectedTopStitch;

    this.errorMessage = this.shirtBuilderService.ValidateFinerDetailsStage();
    if (this.errorMessage === "") {
      this.shirtBuilderService.SetWizardStage.emit(WizardStage.Measurements);
    }
  }
}
