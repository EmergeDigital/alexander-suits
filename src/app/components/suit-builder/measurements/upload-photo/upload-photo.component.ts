import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { MeasurementStage } from '../../../../models/suit-builder/measurementsStage';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';

@Component({
  selector: 'suit-builder-measurements-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit {

    constructor(private suitBuilderService: SuitBuilderService) { }

    public ngOnInit(): void {

    }

    private Previous(): void {
      this.suitBuilderService.SetMeasurementsStage.emit(MeasurementStage.FinerMeasurements);
    }
  
    private Next(): void {
      this.suitBuilderService.SetWizardStage.emit(WizardStage.Checkout);
    }
}
