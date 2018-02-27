import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { JacketBuilderService } from '../../jacket-builder.service';
import { FinerDetailsStage } from '../../../../models/jacket-builder/finerDetailsStage';
import { WizardStage } from '../../../../models/jacket-builder/wizardStage';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'jacket-builder-finer-details-package-stitching',
  templateUrl: './package-stitching.component.html',
  styleUrls: ['./package-stitching.component.scss']
})
export class PackageStitchingComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  private FinerDetailsStage = FinerDetailsStage;

  private contrastPackagesMock: any[] = [
    { "name": "1", "desc": "Fake button holes", "price": "200", "url": "assets/jacket-builder/buttons/buttons-v1.png" },
    { "name": "2", "desc": "Working button holes", "price": "200", "url": "assets/jacket-builder/buttons/buttons-v2.png" },
  ];

  private topStitchsMock: any[] = [
    { "name": "1", "desc": "Fake button holes", "price": "200", "url": "assets/jacket-builder/buttons/buttons-v1.png" },
    { "name": "2", "desc": "Working button holes", "price": "200", "url": "assets/jacket-builder/buttons/buttons-v2.png" },
  ];

  private errorMessage: string = "";

  private selectedConstrastPackage: any = {};
  private isSelectedConstrastPackage: boolean = false;

  private selectedTopStitch: any = {};
  private isSelectedTopStitch: boolean = false;

  private selectedContrastPackageColour: string = "";

  private currentSuit: any = {};

  constructor(private jacketBuilderService: JacketBuilderService, private dialog: MatDialog) { }

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

  private SelectContrastPackage(constrastPackage: any) {
    this.selectedConstrastPackage = constrastPackage;
    this.isSelectedConstrastPackage = true;
  }

  private SelectTopStitch(topStitch: any) {
    this.selectedTopStitch = topStitch;
    this.isSelectedTopStitch = true;
  }

  private Previous() {
    this.jacketBuilderService.SetFinerDetailsStage.emit(FinerDetailsStage.ButtonStyles);
  }

  private Next() {
    this.jacketBuilderService.suit.contrastPackage = this.selectedConstrastPackage;
    this.jacketBuilderService.suit.topStitch = this.selectedTopStitch;
    this.jacketBuilderService.suit.contrastPackageColour = this.selectedContrastPackageColour;

    this.jacketBuilderService.isContrastPackageSelected = this.isSelectedConstrastPackage;
    this.jacketBuilderService.isTopStitchSelected = this.isSelectedTopStitch;

    this.errorMessage = this.jacketBuilderService.ValidateFinerDetailsStage();
    if (this.errorMessage === "") {
      this.jacketBuilderService.SetWizardStage.emit(WizardStage.Measurements);
    }
  }
}
