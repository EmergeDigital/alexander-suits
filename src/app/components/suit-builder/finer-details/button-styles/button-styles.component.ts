import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';
import { FinerDetailsStage } from '../../../../models/suit-builder/finerDetailsStage';

@Component({
  selector: 'suit-builder-finer-details-button-styles',
  templateUrl: './button-styles.component.html',
  styleUrls: ['./button-styles.component.scss']
})
export class ButtonStylesComponent implements OnInit {

    constructor(private suitBuilderService: SuitBuilderService) { }

    public ngOnInit(): void {

    }

    private Previous() {
      this.suitBuilderService.SetWizardStage.emit(WizardStage.Design);
    }
  
    private Next() {
      this.suitBuilderService.SetFinerDetailsStage.emit(FinerDetailsStage.PackageStitching);
    }
}
