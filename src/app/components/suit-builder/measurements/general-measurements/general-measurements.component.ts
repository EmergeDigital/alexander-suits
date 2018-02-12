import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { MeasurementStage } from '../../../../models/suit-builder/measurementsStage';

@Component({
  selector: 'suit-builder-measurements-general-measurements',
  templateUrl: './general-measurements.component.html',
  styleUrls: ['./general-measurements.component.scss']
})
export class GeneralMeasurementsComponent implements OnInit {

    constructor(private suitBuilderService: SuitBuilderService) { }

    public ngOnInit(): void {

    }

    private Previous(): void {
      this.suitBuilderService.SetMeasurementsStage.emit(MeasurementStage.BodyType);
    }
  
    private Next(): void {
      this.suitBuilderService.SetMeasurementsStage.emit(MeasurementStage.FinerMeasurements);
    }
}
