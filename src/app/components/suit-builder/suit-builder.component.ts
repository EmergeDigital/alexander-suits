import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from './suit-builder.service';
import { WizardStage } from '../../models/suit-builder/wizardStage';

@Component({
  templateUrl: './suit-builder.component.html',
  styleUrls: ['./suit-builder.component.scss']
})
export class SuitBuilderComponent implements OnInit {
  private WizardStage = WizardStage; //Html Reference

  private currentWizardStage: WizardStage = WizardStage.Fabric;

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.suitBuilderService.SetWizardStage.subscribe((wizardStage: WizardStage) => this.currentWizardStage = wizardStage);
  }
}
