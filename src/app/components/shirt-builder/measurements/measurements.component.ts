import { Component, OnInit } from '@angular/core';
import { ShirtBuilderService } from '../shirt-builder.service';
import { MeasurementStage } from '../../../models/shirt-builder/measurementsStage';

@Component({
  selector: 'shirt-builder-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {
  private MeasurementStage = MeasurementStage; //Html Reference

  private currentMeasurementStage: MeasurementStage = MeasurementStage.BodyType;

  constructor(private shirtBuilderService: ShirtBuilderService) { }

  public ngOnInit(): void {
    this.currentMeasurementStage = this.shirtBuilderService.MeasurementStage;
    this.shirtBuilderService.SetMeasurementsStage.subscribe((measurementStage: MeasurementStage) => this.currentMeasurementStage = measurementStage);
  }
}
