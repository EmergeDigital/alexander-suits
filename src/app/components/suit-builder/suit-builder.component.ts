import { Component, OnInit } from '@angular/core';
import { WizardStage } from '../../models/suit-builder/wizardStage';

@Component({
  templateUrl: './suit-builder.component.html',
  styleUrls: ['./suit-builder.component.scss']
})
export class SuitBuilderComponent implements OnInit {
    WizardStage = WizardStage; //Html Reference

    currentWizardStage: WizardStage = WizardStage.Fabric;

    constructor() { }

    public ngOnInit(): void {

    }

}
