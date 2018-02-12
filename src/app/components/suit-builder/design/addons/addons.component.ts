import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { DesignStage } from '../../../../models/suit-builder/designStage';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';

@Component({
  selector: 'suit-builder-design-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.scss']
})
export class AddonsComponent implements OnInit {
  private errorMessage: string = "";

  private isExtraPantsSelected: boolean = false;
  private isWaisteCoatSelected: boolean = false;

  private currentSuit: any = {};

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.suitBuilderService.suit;
  }

  private Previous() {
    this.suitBuilderService.SetDesignStage.emit(DesignStage.PantStyles);
  }

  private Next() {
    this.suitBuilderService.suit.extra_pants = this.isExtraPantsSelected;
    this.suitBuilderService.suit.waistcoat = this.isWaisteCoatSelected;
    this.suitBuilderService.SetWizardStage.emit(WizardStage.FinerDetails);
  }
}
