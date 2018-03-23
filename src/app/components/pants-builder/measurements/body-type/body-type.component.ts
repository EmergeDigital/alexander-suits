import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { PantsBuilderService } from '../../pants-builder.service';
import { MeasurementStage } from '../../../../models/pants-builder/measurementsStage';
import { WizardStage } from '../../../../models/pants-builder/wizardStage';

@Component({
  selector: 'pants-builder-measurements-body-type',
  templateUrl: './body-type.component.html',
  styleUrls: ['./body-type.component.scss']
})
export class BodyTypeComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  public MeasurementStage = MeasurementStage;

  public bodyTypesMock: any[] = [
    {"name": "Slender", "desc": "Skinny figure with small waist.", "url": "assets/measurements/1-slender.png"},
    {"name": "Slender, Slight Belly", "desc": "Skinny figure with a bit of fat around the edges.", "url": "assets/measurements/2-Slender-with-slight-belly.png"},
    {"name": "Slender, Athletic", "desc": "Skinny figure with a bit of muscle around the edges.", "url": "assets/measurements/3-Slender-Athletic.png"},
    {"name": "Rounder", "desc": "Rectangular figure with round waist.", "url": "assets/measurements/4-Rounder-Figure.png"},
    {"name": "Rounder, Large Stomach", "desc": "Rectangular figure with a protruding stomach.", "url": "assets/measurements/5-Rounder-Figure-with-large-stomach.png"},
    {"name": "Compact, Slight Belly", "desc": "Muscular figure with higher body fat.", "url": "assets/measurements/6-Compact-with-Stomach.png"},
    {"name": "Compact, Athletic Chest", "desc": "Muscular figure with lower body fat.", "url": "assets/measurements/7-Compact-Athletic-Chest.png"},
  ];

  public selectedBodyType: any = {};
  public isSelectedBodyType: boolean = false;

  public currentSuit: any = {};

  constructor(public pantsBuilderService: PantsBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.pantsBuilderService.suit;
    this.selectedBodyType = this.pantsBuilderService.suit.bodyType;

    this.isSelectedBodyType = this.pantsBuilderService.isBodyTypeSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public SelectBodyType(bodyType: any) {
    this.selectedBodyType = bodyType;
    this.isSelectedBodyType = true;
  }

  public Previous(): void {
    this.pantsBuilderService.SetWizardStage.emit(WizardStage.Design);
  }

  public Next(): void {
    this.pantsBuilderService.suit.bodyType = this.selectedBodyType;

    this.pantsBuilderService.isBodyTypeSelected = this.isSelectedBodyType;

    this.pantsBuilderService.SetMeasurementsStage.emit(MeasurementStage.GeneralMeasurements);
  }
}
