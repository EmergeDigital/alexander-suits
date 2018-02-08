import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';
import { DesignStage } from '../../../../models/suit-builder/designStage';

@Component({
  selector: 'suit-builder-design-collar',
  templateUrl: './collar.component.html',
  styleUrls: ['./collar.component.scss']
})
export class CollarComponent implements OnInit {

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {

  }

  private Previous() {
    this.suitBuilderService.SetWizardStage.emit(WizardStage.Fabric);
  }

  private Next() {
    this.suitBuilderService.SetDesignStage.emit(DesignStage.Pockets);
  }
}
