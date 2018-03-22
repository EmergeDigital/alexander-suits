import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { ShirtBuilderService } from '../../shirt-builder.service';
import { FinerDetailsStage } from '../../../../models/shirt-builder/finerDetailsStage';
import { WizardStage } from '../../../../models/shirt-builder/wizardStage';
import { MatDialog } from '@angular/material';
import { ToastOptions, ToastyService, ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'shirt-builder-finer-details-package-stitching',
  templateUrl: './package-stitching.component.html',
  styleUrls: ['./package-stitching.component.scss']
})
export class PackageStitchingComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  public FinerDetailsStage = FinerDetailsStage;

  public contrastPackagesMock: any[] = [
    { "name": "Package 1", "desc": "FComplete Collar and Complete Cuff are made out of a contrast material. A famous example is the banker’s shirt with a white collar and cuff.", "url": "" },
    { "name": "Package 2", "desc": "Contrast Fabric on the inside of collar and cuff, as well as on gusset and sleeve slit.", "url": "" },
  ];

  public topStitchsMock: any[] = [
    { "name": "1", "desc": "Fake button holes", "url": "assets/shirt-builder/buttons/buttons-v1.png" },
    { "name": "2", "desc": "Working button holes", "url": "assets/shirt-builder/buttons/buttons-v2.png" },
  ];

  public errorMessage: string = "";

  public selectedConstrastPackage: any = {};
  public isSelectedConstrastPackage: boolean = false;

  public selectedContrastPackageColour: string = "";

  public currentSuit: any = {};

  constructor(public shirtBuilderService: ShirtBuilderService, public dialog: MatDialog, public toastyService: ToastyService, public toastyConfig: ToastyConfig) { }

  public ngOnInit(): void {
    this.currentSuit = this.shirtBuilderService.suit;
    this.selectedConstrastPackage = this.shirtBuilderService.suit.contrastPackage;
    this.selectedContrastPackageColour = this.shirtBuilderService.suit.contrastPackageColour;

    this.isSelectedConstrastPackage = this.shirtBuilderService.isContrastPackageSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public SelectContrastPackage(constrastPackage: any) {
    this.selectedConstrastPackage = constrastPackage;
    this.isSelectedConstrastPackage = true;
  }

  public Previous() {
    this.shirtBuilderService.SetFinerDetailsStage.emit(FinerDetailsStage.ButtonStyles);
  }

  public Next() {
    this.shirtBuilderService.suit.contrastPackage = this.selectedConstrastPackage;
    this.shirtBuilderService.suit.contrastPackageColour = this.selectedContrastPackageColour;

    this.shirtBuilderService.isContrastPackageSelected = this.isSelectedConstrastPackage;

    this.errorMessage = this.shirtBuilderService.ValidateFinerDetailsStage();
    if (this.errorMessage === "") {
      this.shirtBuilderService.SetWizardStage.emit(WizardStage.Measurements);
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
