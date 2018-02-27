import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { JacketBuilderService } from '../../jacket-builder.service';
import { MeasurementStage } from '../../../../models/jacket-builder/measurementsStage';

@Component({
  selector: 'jacket-builder-measurements-general-measurements',
  templateUrl: './general-measurements.component.html',
  styleUrls: ['./general-measurements.component.scss']
})
export class GeneralMeasurementsComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  private MeasurementStage = MeasurementStage;

  private generalMeasurements: any = { height: 0, chest: 0, back: 0, biceps: 0, stomach: 0, seat: 0, thigh: 0};

  private currentSuit: any = {};

  constructor(private jacketBuilderService: JacketBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.jacketBuilderService.suit;
    this.generalMeasurements = this.jacketBuilderService.suit.generalMeasurements;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private Previous(): void {
    this.jacketBuilderService.SetMeasurementsStage.emit(MeasurementStage.BodyType);
  }

  private Next(): void {
    this.jacketBuilderService.suit.generalMeasurements = this.generalMeasurements;
    this.jacketBuilderService.SetMeasurementsStage.emit(MeasurementStage.FinerMeasurements);
  }
}
