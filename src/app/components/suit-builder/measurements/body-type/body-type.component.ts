import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { MeasurementStage } from '../../../../models/suit-builder/measurementsStage';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';

@Component({
  selector: 'suit-builder-measurements-body-type',
  templateUrl: './body-type.component.html',
  styleUrls: ['./body-type.component.scss']
})
export class BodyTypeComponent implements OnInit {

    constructor(private suitBuilderService: SuitBuilderService) { }

    public ngOnInit(): void {

    }

    private Previous(): void {
      this.suitBuilderService.SetWizardStage.emit(WizardStage.FinerDetails);
    }
  
    private Next(): void {
      this.suitBuilderService.SetMeasurementsStage.emit(MeasurementStage.GeneralMeasurements);
    }
}
