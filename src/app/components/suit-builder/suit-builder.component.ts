import { Component, OnInit } from '@angular/core';
import { WizardStage } from '../../models/suit-builder/wizardStage';

@Component({
  templateUrl: './suit-builder.component.html',
  styleUrls: ['./suit-builder.component.scss']
})
export class SuitBuilderComponent implements OnInit {
<<<<<<< HEAD
  private WizardStage = WizardStage; //Html Reference

  private currentWizardStage: WizardStage = WizardStage.Fabric;
=======
    WizardStage = WizardStage; //Html Reference

    currentWizardStage: WizardStage = WizardStage.Fabric;
>>>>>>> 544924e14a6222df035332bb0a6f4607b778dfd4

  constructor() { }

  public ngOnInit(): void {

  }

}
