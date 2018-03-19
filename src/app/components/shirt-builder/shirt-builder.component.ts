import { Component, OnInit } from '@angular/core';
import { ShirtBuilderService } from './shirt-builder.service';
import { WizardStage } from '../../models/shirt-builder/wizardStage';

@Component({
  templateUrl: './shirt-builder.component.html',
  styleUrls: ['./shirt-builder.component.scss']
})
export class ShirtBuilderComponent implements OnInit {
  public WizardStage = WizardStage; //Html Reference

  public currentWizardStage: WizardStage = WizardStage.Fabric;

  constructor(public shirtBuilderService: ShirtBuilderService) { }

  public ngOnInit(): void {
    this.shirtBuilderService.SetWizardStage.subscribe((wizardStage: WizardStage) => this.currentWizardStage = wizardStage);
  }
}
