import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { JacketBuilderService } from '../../jacket-builder.service';
import { MeasurementStage } from '../../../../models/jacket-builder/measurementsStage';

@Component({
  selector: 'jacket-builder-measurements-finer-measurements',
  templateUrl: './finer-measurements.component.html',
  styleUrls: ['./finer-measurements.component.scss']
})
export class FinerMeasurementsComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  public MeasurementStage = MeasurementStage;

  public finerMeasurements: any = { jacketBackLength: 0, jacketWaist: 0, withoutTrouserWaist: 0, withoutTrouserOutsideSeam: 0, trouserWaist: 0, trouserInsideSeam: 0, trouserOutsideSeam: 0};

  public currentSuit: any = {};

  constructor(public jacketBuilderService: JacketBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.jacketBuilderService.suit;
    this.finerMeasurements = this.jacketBuilderService.suit.finerMeasurements;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public WatchVideo(video: string): void {
    window.open(video, '_blank');
  }

  public Previous(): void {
    this.jacketBuilderService.SetMeasurementsStage.emit(MeasurementStage.GeneralMeasurements);
  }

  public Next(): void {
    this.jacketBuilderService.suit.finerMeasurements = this.finerMeasurements;
    this.jacketBuilderService.SetMeasurementsStage.emit(MeasurementStage.UploadPhoto);
  }
}
