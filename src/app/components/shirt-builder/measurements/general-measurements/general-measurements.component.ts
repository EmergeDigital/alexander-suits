import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { ShirtBuilderService } from '../../shirt-builder.service';
import { MeasurementStage } from '../../../../models/shirt-builder/measurementsStage';

@Component({
  selector: 'shirt-builder-measurements-general-measurements',
  templateUrl: './general-measurements.component.html',
  styleUrls: ['./general-measurements.component.scss']
})
export class GeneralMeasurementsComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  public MeasurementStage = MeasurementStage;

  public generalMeasurements: any = { height: 0, chest: 0, back: 0, biceps: 0, stomach: 0, seat: 0, thigh: 0};

  public currentSuit: any = {};

  constructor(public shirtBuilderService: ShirtBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.shirtBuilderService.suit;
    this.generalMeasurements = this.shirtBuilderService.suit.generalMeasurements;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public Previous(): void {
    this.shirtBuilderService.SetMeasurementsStage.emit(MeasurementStage.BodyType);
  }

  public Next(): void {
    this.shirtBuilderService.suit.generalMeasurements = this.generalMeasurements;
    this.shirtBuilderService.SetMeasurementsStage.emit(MeasurementStage.FinerMeasurements);
  }
}
