import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { ShirtBuilderService } from '../../shirt-builder.service';
import { MeasurementStage } from '../../../../models/shirt-builder/measurementsStage';

@Component({
  selector: 'shirt-builder-measurements-finer-measurements',
  templateUrl: './finer-measurements.component.html',
  styleUrls: ['./finer-measurements.component.scss']
})
export class FinerMeasurementsComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  private MeasurementStage = MeasurementStage;

  private finerMeasurements: any = { jacketBackLength: 0, jacketWaist: 0, withoutTrouserWaist: 0, withoutTrouserOutsideSeam: 0, trouserWaist: 0, trouserInsideSeam: 0, trouserOutsideSeam: 0};

  private currentSuit: any = {};

  constructor(private shirtBuilderService: ShirtBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.shirtBuilderService.suit;
    this.finerMeasurements = this.shirtBuilderService.suit.finerMeasurements;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private Previous(): void {
    this.shirtBuilderService.SetMeasurementsStage.emit(MeasurementStage.GeneralMeasurements);
  }

  private Next(): void {
    this.shirtBuilderService.suit.finerMeasurements = this.finerMeasurements;
    this.shirtBuilderService.SetMeasurementsStage.emit(MeasurementStage.UploadPhoto);
  }
}
