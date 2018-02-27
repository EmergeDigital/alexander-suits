import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { PantsBuilderService } from '../../pants-builder.service';
import { MeasurementStage } from '../../../../models/pants-builder/measurementsStage';

@Component({
  selector: 'pants-builder-measurements-general-measurements',
  templateUrl: './general-measurements.component.html',
  styleUrls: ['./general-measurements.component.scss']
})
export class GeneralMeasurementsComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  private MeasurementStage = MeasurementStage;

  private generalMeasurements: any = { height: 0, chest: 0, back: 0, biceps: 0, stomach: 0, seat: 0, thigh: 0};

  private currentSuit: any = {};

  constructor(private pantsBuilderService: PantsBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.pantsBuilderService.suit;
    this.generalMeasurements = this.pantsBuilderService.suit.generalMeasurements;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private Previous(): void {
    this.pantsBuilderService.SetMeasurementsStage.emit(MeasurementStage.BodyType);
  }

  private Next(): void {
    this.pantsBuilderService.suit.generalMeasurements = this.generalMeasurements;
    this.pantsBuilderService.SetMeasurementsStage.emit(MeasurementStage.FinerMeasurements);
  }
}
