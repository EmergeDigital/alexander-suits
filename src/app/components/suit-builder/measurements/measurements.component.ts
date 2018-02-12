import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../suit-builder.service';
import { MeasurementStage } from '../../../models/suit-builder/measurementsStage';

@Component({
  selector: 'suit-builder-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {
  private MeasurementStage = MeasurementStage; //Html Reference

  private currentMeasurementStage: MeasurementStage = MeasurementStage.BodyType;

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.suitBuilderService.SetMeasurementsStage.subscribe((measurementStage: MeasurementStage) => this.currentMeasurementStage = measurementStage);
  }
}
