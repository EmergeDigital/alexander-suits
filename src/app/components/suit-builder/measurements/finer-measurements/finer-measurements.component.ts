import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { MeasurementStage } from '../../../../models/suit-builder/measurementsStage';

@Component({
  selector: 'suit-builder-measurements-finer-measurements',
  templateUrl: './finer-measurements.component.html',
  styleUrls: ['./finer-measurements.component.scss']
})
export class FinerMeasurementsComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  public MeasurementStage = MeasurementStage;

  public finerMeasurements: any = { jacketBackLength: 0, jacketWaist: 0, withoutTrouserWaist: 0, withoutTrouserOutsideSeam: 0, trouserWaist: 0, trouserInsideSeam: 0, trouserOutsideSeam: 0};

  public currentSuit: any = {};

  constructor(public suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.suitBuilderService.suit;
    this.finerMeasurements = this.suitBuilderService.suit.finerMeasurements;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public WatchVideo(video: string): void {
    window.open(video, '_blank');
  }

  public Previous(): void {
    this.suitBuilderService.SetMeasurementsStage.emit(MeasurementStage.GeneralMeasurements);
  }

  public Next(): void {
    this.suitBuilderService.suit.finerMeasurements = this.finerMeasurements;
    this.suitBuilderService.SetMeasurementsStage.emit(MeasurementStage.UploadPhoto);
  }
}
