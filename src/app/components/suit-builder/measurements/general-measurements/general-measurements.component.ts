import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { MeasurementStage } from '../../../../models/suit-builder/measurementsStage';

@Component({
  selector: 'suit-builder-measurements-general-measurements',
  templateUrl: './general-measurements.component.html',
  styleUrls: ['./general-measurements.component.scss']
})
export class GeneralMeasurementsComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  public MeasurementStage = MeasurementStage;

  public generalMeasurements: any = { height: 0, chest: 0, back: 0, biceps: 0, stomach: 0, seat: 0, thigh: 0 };

  public currentSuit: any = {};

  constructor(public suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.suitBuilderService.suit;
    this.generalMeasurements = this.suitBuilderService.suit.generalMeasurements;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public WatchVideo(video: string): void {
    window.open(video, '_blank');
  }

  public Previous(): void {
    this.suitBuilderService.SetMeasurementsStage.emit(MeasurementStage.BodyType);
  }

  public Next(): void {
    this.suitBuilderService.suit.generalMeasurements = this.generalMeasurements;
    this.suitBuilderService.SetMeasurementsStage.emit(MeasurementStage.FinerMeasurements);
  }
}
