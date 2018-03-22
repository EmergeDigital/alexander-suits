import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { JacketBuilderService } from '../../jacket-builder.service';
import { FinerDetailsStage } from '../../../../models/jacket-builder/finerDetailsStage';
import { WizardStage } from '../../../../models/jacket-builder/wizardStage';
import { MatDialog } from '@angular/material';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'jacket-builder-finer-details-package-stitching',
  templateUrl: './package-stitching.component.html',
  styleUrls: ['./package-stitching.component.scss']
})
export class PackageStitchingComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  public FinerDetailsStage = FinerDetailsStage;

  public contrastPackagesMock: any[] = [
    { "name": "1", "desc": "Fake button holes", "url": "assets/jacket-builder/buttons/buttons-v1.png" },
    { "name": "2", "desc": "Working button holes", "url": "assets/jacket-builder/buttons/buttons-v2.png" },
  ];

  public topStitchsMock: any[] = [
    { "name": "1", "desc": "Fake button holes", "url": "assets/jacket-builder/buttons/buttons-v1.png" },
    { "name": "2", "desc": "Working button holes", "url": "assets/jacket-builder/buttons/buttons-v2.png" },
  ];

  public errorMessage: string = "";

  public selectedConstrastPackage: any = {};
  public isSelectedConstrastPackage: boolean = false;

  public selectedTopStitch: any = {};
  public isSelectedTopStitch: boolean = false;

  public selectedContrastPackageColour: string = "";

  public currentSuit: any = {};

  constructor(public jacketBuilderService: JacketBuilderService, public dialog: MatDialog, public toastyService: ToastyService, public toastyConfig: ToastyConfig) { }

  public ngOnInit(): void {
    this.currentSuit = this.jacketBuilderService.suit;
    this.selectedConstrastPackage = this.jacketBuilderService.suit.contrastPackage;
    this.selectedTopStitch = this.jacketBuilderService.suit.topStitch;
    this.selectedContrastPackageColour = this.jacketBuilderService.suit.contrastPackageColour;

    this.isSelectedConstrastPackage = this.jacketBuilderService.isContrastPackageSelected;
    this.isSelectedTopStitch = this.jacketBuilderService.isTopStitchSelected;
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
    this.jacketBuilderService.SetFinerDetailsStage.emit(FinerDetailsStage.ButtonStyles);
  }

  public Next() {
    this.jacketBuilderService.suit.contrastPackage = this.selectedConstrastPackage;
    this.jacketBuilderService.suit.topStitch = this.selectedTopStitch;
    this.jacketBuilderService.suit.contrastPackageColour = this.selectedContrastPackageColour;

    this.jacketBuilderService.isContrastPackageSelected = this.isSelectedConstrastPackage;
    this.jacketBuilderService.isTopStitchSelected = this.isSelectedTopStitch;

    this.errorMessage = this.jacketBuilderService.ValidateFinerDetailsStage();
    if (this.errorMessage === "") {
      this.jacketBuilderService.SetWizardStage.emit(WizardStage.Measurements);
    } else {
      var toastOptions: ToastOptions = {
        title: "Error",
        msg: this.errorMessage
      };

      this.toastyService.error(toastOptions);
      console.log();
    }
  }
}
