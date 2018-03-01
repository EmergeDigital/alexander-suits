import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ExtraDetailsModalComponent } from '../extra-details-modal/extra-details-modal.component';

import { SuitBuilderService } from '../../suit-builder.service';

import { DesignStage } from '../../../../models/suit-builder/designStage';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';
import { MockupGarmentModalComponent } from '../../utilities/mockup-garment-modal/mockup-garment-modal.component';

@Component({
  selector: 'suit-builder-design-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.scss']
})
export class AddonsComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  private DesignStage = DesignStage;

  private errorMessage: string = "";

  private isExtraPantsSelected: boolean = false;
  private isWaisteCoatSelected: boolean = false;

  private currentSuit: any = {};

  constructor(private suitBuilderService: SuitBuilderService, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.currentSuit = this.suitBuilderService.suit;
    this.isExtraPantsSelected = this.suitBuilderService.suit.extra_pants;
    this.isWaisteCoatSelected = this.suitBuilderService.suit.waistcoat;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private Previous() {
    this.suitBuilderService.SetDesignStage.emit(DesignStage.PantStyles);
  }

  private Next() {
    this.suitBuilderService.suit.extra_pants = this.isExtraPantsSelected;
    this.suitBuilderService.suit.waistcoat = this.isWaisteCoatSelected;

    this.errorMessage = this.suitBuilderService.ValidateDesignStage();
    if (this.errorMessage === "") {
      if (this.suitBuilderService.isFinerDetailsShown === false) {
        let ExtraDetailsModal = this.dialog.open(ExtraDetailsModalComponent, {
          height: '600px',
          width: '500px',
        });

        ExtraDetailsModal.afterClosed().subscribe(result => {
          this.suitBuilderService.isFinerDetailsShown = true;

          if (result === "true") {
            this.suitBuilderService.isFinerDetailsAccepted = true;
            this.suitBuilderService.SetWizardStage.emit(WizardStage.FinerDetails);
          }
          else {
            this.suitBuilderService.isFinerDetailsAccepted = false;

            let MockupGarmentModal = this.dialog.open(MockupGarmentModalComponent, {
              height: '600px',
              width: '500px',
            });

            MockupGarmentModal.afterClosed().subscribe(result => {
              this.suitBuilderService.isMockupGarmentShown = true;
              
              this.suitBuilderService.SetWizardStage.emit(WizardStage.Measurements);
            });
          }
        });
      } else {
        this.suitBuilderService.SetWizardStage.emit(WizardStage.Measurements);
      }
    }
  }
}
