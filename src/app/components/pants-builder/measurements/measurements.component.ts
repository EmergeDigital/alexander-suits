import { Component, OnInit } from '@angular/core';
import { PantsBuilderService } from '../pants-builder.service';
import { MeasurementStage } from '../../../models/pants-builder/measurementsStage';

@Component({
  selector: 'pants-builder-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {
  private MeasurementStage = MeasurementStage; //Html Reference

  private currentMeasurementStage: MeasurementStage = MeasurementStage.BodyType;

  constructor(private pantsBuilderService: PantsBuilderService) { }

  public ngOnInit(): void {
    this.currentMeasurementStage = this.pantsBuilderService.MeasurementStage;
    this.pantsBuilderService.SetMeasurementsStage.subscribe((measurementStage: MeasurementStage) => this.currentMeasurementStage = measurementStage);
  }
}
