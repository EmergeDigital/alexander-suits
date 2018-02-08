import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { FinerDetailsStage } from '../../../../models/suit-builder/finerDetailsStage';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';

@Component({
  selector: 'suit-builder-finer-details-package-stitching',
  templateUrl: './package-stitching.component.html',
  styleUrls: ['./package-stitching.component.scss']
})
export class PackageStitchingComponent implements OnInit {

    constructor(private suitBuilderService: SuitBuilderService) { }

    public ngOnInit(): void {

    }

    private Previous() {
      this.suitBuilderService.SetFinerDetailsStage.emit(FinerDetailsStage.ButtonStyles);
    }
  
    private Next() {
      this.suitBuilderService.SetWizardStage.emit(WizardStage.Measurements);
    }
}
