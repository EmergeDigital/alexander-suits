import { Component, OnInit } from '@angular/core';
import { JacketBuilderService } from './jacket-builder.service';
import { WizardStage } from '../../models/jacket-builder/wizardStage';

@Component({
  templateUrl: './jacket-builder.component.html',
  styleUrls: ['./jacket-builder.component.scss']
})
export class JacketBuilderComponent implements OnInit {
  private WizardStage = WizardStage; //Html Reference

  private currentWizardStage: WizardStage = WizardStage.Fabric;

  constructor(private jacketBuilderService: JacketBuilderService) { }

  public ngOnInit(): void {
    this.jacketBuilderService.SetWizardStage.subscribe((wizardStage: WizardStage) => this.currentWizardStage = wizardStage);
  }
}
