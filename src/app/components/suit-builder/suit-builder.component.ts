import { Component, OnInit } from '@angular/core';
import { WizardStage } from '../../models/suit-builder/wizardStage';
import { SuitService } from '../../services/customizers/suit.service';

@Component({
  templateUrl: './suit-builder.component.html',
  styleUrls: ['./suit-builder.component.scss']
})
export class SuitBuilderComponent implements OnInit {
  private WizardStage = WizardStage; //Html Reference

  private currentWizardStage: WizardStage = WizardStage.Fabric;

  constructor(private suitService: SuitService) { }

  public ngOnInit(): void {
    this.suitService.NextWizardStage.subscribe(() => this.NextWizardStage());
  }

  private NextWizardStage() {
    this.currentWizardStage++;
  }
}
