import { Component, OnInit } from '@angular/core';
import { PantsBuilderService } from '../pants-builder.service';
import { MeasurementStage } from '../../../models/pants-builder/measurementsStage';

@Component({
  selector: 'pants-builder-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {
  public MeasurementStage = MeasurementStage; //Html Reference

  public currentMeasurementStage: MeasurementStage = MeasurementStage.BodyType;

  constructor(public pantsBuilderService: PantsBuilderService) { }

  public ngOnInit(): void {
    this.currentMeasurementStage = this.pantsBuilderService.MeasurementStage;
    this.pantsBuilderService.SetMeasurementsStage.subscribe((measurementStage: MeasurementStage) => this.currentMeasurementStage = measurementStage);
  }
}
