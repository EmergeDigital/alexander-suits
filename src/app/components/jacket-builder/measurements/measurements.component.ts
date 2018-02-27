import { Component, OnInit } from '@angular/core';
import { JacketBuilderService } from '../jacket-builder.service';
import { MeasurementStage } from '../../../models/jacket-builder/measurementsStage';

@Component({
  selector: 'jacket-builder-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {
  private MeasurementStage = MeasurementStage; //Html Reference

  private currentMeasurementStage: MeasurementStage = MeasurementStage.BodyType;

  constructor(private jacketBuilderService: JacketBuilderService) { }

  public ngOnInit(): void {
    this.currentMeasurementStage = this.jacketBuilderService.MeasurementStage;
    this.jacketBuilderService.SetMeasurementsStage.subscribe((measurementStage: MeasurementStage) => this.currentMeasurementStage = measurementStage);
  }
}
