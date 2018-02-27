import { Component, OnInit } from '@angular/core';
import { PantsBuilderService } from './pants-builder.service';
import { WizardStage } from '../../models/pants-builder/wizardStage';

@Component({
  templateUrl: './pants-builder.component.html',
  styleUrls: ['./pants-builder.component.scss']
})
export class PantsBuilderComponent implements OnInit {
  private WizardStage = WizardStage; //Html Reference

  private currentWizardStage: WizardStage = WizardStage.Fabric;

  constructor(private pantsBuilderService: PantsBuilderService) { }

  public ngOnInit(): void {
    this.pantsBuilderService.SetWizardStage.subscribe((wizardStage: WizardStage) => this.currentWizardStage = wizardStage);
  }
}
