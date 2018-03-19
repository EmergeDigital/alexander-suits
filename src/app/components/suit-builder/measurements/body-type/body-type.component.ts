import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { MeasurementStage } from '../../../../models/suit-builder/measurementsStage';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';

@Component({
  selector: 'suit-builder-measurements-body-type',
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

  constructor(public suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.suitBuilderService.suit;
    this.selectedBodyType = this.suitBuilderService.suit.bodyType;
    
    this.isSelectedBodyType = this.suitBuilderService.isBodyTypeSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public SelectBodyType(bodyType: any) {
    this.selectedBodyType = bodyType;
    this.isSelectedBodyType = true;
  }

  public Previous(): void {
    this.suitBuilderService.SetWizardStage.emit(WizardStage.FinerDetails);
  }

  public Next(): void {
    this.suitBuilderService.suit.bodyType = this.selectedBodyType;
    
    this.suitBuilderService.isBodyTypeSelected = this.isSelectedBodyType;

    this.suitBuilderService.SetMeasurementsStage.emit(MeasurementStage.GeneralMeasurements);
  }
}
