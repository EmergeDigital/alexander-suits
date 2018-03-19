import { Component, OnInit } from '@angular/core';
import { ShirtBuilderService } from '../shirt-builder.service';
import { MeasurementStage } from '../../../models/shirt-builder/measurementsStage';

@Component({
  selector: 'shirt-builder-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {
  public MeasurementStage = MeasurementStage; //Html Reference

  public currentMeasurementStage: MeasurementStage = MeasurementStage.BodyType;

  constructor(public shirtBuilderService: ShirtBuilderService) { }

  public ngOnInit(): void {
    this.currentMeasurementStage = this.shirtBuilderService.MeasurementStage;
    this.shirtBuilderService.SetMeasurementsStage.subscribe((measurementStage: MeasurementStage) => this.currentMeasurementStage = measurementStage);
  }
}
