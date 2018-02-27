import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { PantsBuilderService } from '../../pants-builder.service';
import { MeasurementStage } from '../../../../models/pants-builder/measurementsStage';

@Component({
  selector: 'pants-builder-measurements-finer-measurements',
  templateUrl: './finer-measurements.component.html',
  styleUrls: ['./finer-measurements.component.scss']
})
export class FinerMeasurementsComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  private MeasurementStage = MeasurementStage;

  private finerMeasurements: any = { jacketBackLength: 0, jacketWaist: 0, withoutTrouserWaist: 0, withoutTrouserOutsideSeam: 0, trouserWaist: 0, trouserInsideSeam: 0, trouserOutsideSeam: 0};

  private currentSuit: any = {};

  constructor(private pantsBuilderService: PantsBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.pantsBuilderService.suit;
    this.finerMeasurements = this.pantsBuilderService.suit.finerMeasurements;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private Previous(): void {
    this.pantsBuilderService.SetMeasurementsStage.emit(MeasurementStage.GeneralMeasurements);
  }

  private Next(): void {
    this.pantsBuilderService.suit.finerMeasurements = this.finerMeasurements;
    this.pantsBuilderService.SetMeasurementsStage.emit(MeasurementStage.UploadPhoto);
  }
}
