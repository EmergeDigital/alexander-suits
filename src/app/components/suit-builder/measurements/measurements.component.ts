import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../suit-builder.service';
import { MeasurementStage } from '../../../models/suit-builder/measurementsStage';

@Component({
  selector: 'suit-builder-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {
  public MeasurementStage = MeasurementStage; //Html Reference

  public currentMeasurementStage: MeasurementStage = MeasurementStage.BodyType;

  constructor(public suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.currentMeasurementStage = this.suitBuilderService.MeasurementStage;
    this.suitBuilderService.SetMeasurementsStage.subscribe((measurementStage: MeasurementStage) => this.currentMeasurementStage = measurementStage);
  }
}
