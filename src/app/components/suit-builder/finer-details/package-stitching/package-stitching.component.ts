import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { FinerDetailsStage } from '../../../../models/suit-builder/finerDetailsStage';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';
import { MockupGarmentModalComponent } from '../../utilities/mockup-garment-modal/mockup-garment-modal.component';
import { MatDialog } from '@angular/material';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'suit-builder-finer-details-package-stitching',
  templateUrl: './package-stitching.component.html',
  styleUrls: ['./package-stitching.component.scss']
})
export class PackageStitchingComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  public FinerDetailsStage = FinerDetailsStage;

  public contrastPackagesMock: any[] = [
    { "name": "Basic", "desc": "A basic contrast package.", "url": "" },
    { "name": "Alx", "desc": "A alx constrast package.", "url": "" },
  ];

  public topStitchsMock: any[] = [
    { "name": "None", "desc": "A no top stitch style.", "url": "" },
    { "name": "Single", "desc": "A single top stitch style.", "url": "" },
  ];

  public errorMessage: string = "";

  public selectedConstrastPackage: any = {};
  public isSelectedConstrastPackage: boolean = false;

  public selectedTopStitch: any = {};
  public isSelectedTopStitch: boolean = false;

  public selectedContrastPackageColour: string = "";

  public currentSuit: any = {};

  constructor(public suitBuilderService: SuitBuilderService, public dialog: MatDialog, public toastyService: ToastyService, public toastyConfig: ToastyConfig) { }

  public ngOnInit(): void {
    this.currentSuit = this.suitBuilderService.suit;
    this.selectedConstrastPackage = this.suitBuilderService.suit.contrastPackage;
    this.selectedTopStitch = this.suitBuilderService.suit.topStitch;
    this.selectedContrastPackageColour = this.suitBuilderService.suit.contrastPackageColour;

    this.isSelectedConstrastPackage = this.suitBuilderService.isContrastPackageSelected;
    this.isSelectedTopStitch = this.suitBuilderService.isTopStitchSelected;
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
    this.suitBuilderService.SetFinerDetailsStage.emit(FinerDetailsStage.ButtonStyles);
  }

  public Next() {
    this.suitBuilderService.suit.contrastPackage = this.selectedConstrastPackage;
    this.suitBuilderService.suit.topStitch = this.selectedTopStitch;
    this.suitBuilderService.suit.contrastPackageColour = this.selectedContrastPackageColour;

    this.suitBuilderService.isContrastPackageSelected = this.isSelectedConstrastPackage;
    this.suitBuilderService.isTopStitchSelected = this.isSelectedTopStitch;

    this.errorMessage = this.suitBuilderService.ValidateFinerDetailsStage();
    if (this.errorMessage === "") {
      if (!this.suitBuilderService.isMockupGarmentShown) {
        let MockupGarmentModal = this.dialog.open(MockupGarmentModalComponent, {
          height: '60%',
        });

        MockupGarmentModal.afterClosed().subscribe(result => {
          this.suitBuilderService.isMockupGarmentShown = true;
          this.suitBuilderService.SetWizardStage.emit(WizardStage.Measurements);
        });
      } else {
        this.suitBuilderService.SetWizardStage.emit(WizardStage.Measurements);
      }
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
