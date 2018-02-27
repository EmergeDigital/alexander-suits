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
  
  private MeasurementStage = MeasurementStage;

  private generalMeasurements: any = { height: 0, chest: 0, back: 0, biceps: 0, stomach: 0, seat: 0, thigh: 0};

  private currentSuit: any = {};

  constructor(private shirtBuilderService: ShirtBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.shirtBuilderService.suit;
    this.generalMeasurements = this.shirtBuilderService.suit.generalMeasurements;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private Previous(): void {
    this.shirtBuilderService.SetMeasurementsStage.emit(MeasurementStage.BodyType);
  }

  private Next(): void {
    this.shirtBuilderService.suit.generalMeasurements = this.generalMeasurements;
    this.shirtBuilderService.SetMeasurementsStage.emit(MeasurementStage.FinerMeasurements);
  }
}
