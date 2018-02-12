import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { MeasurementStage } from '../../../../models/suit-builder/measurementsStage';

@Component({
  selector: 'suit-builder-measurements-finer-measurements',
  templateUrl: './finer-measurements.component.html',
  styleUrls: ['./finer-measurements.component.scss']
})
export class FinerMeasurementsComponent implements OnInit {

    constructor(private suitBuilderService: SuitBuilderService) { }

    public ngOnInit(): void {

    }

    private Previous(): void {
      this.suitBuilderService.SetMeasurementsStage.emit(MeasurementStage.GeneralMeasurements);
    }
  
    private Next(): void {
      this.suitBuilderService.SetMeasurementsStage.emit(MeasurementStage.UploadPhoto);
    }
}
