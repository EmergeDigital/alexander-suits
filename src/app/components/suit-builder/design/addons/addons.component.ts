import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ExtraDetailsModalComponent } from '../extra-details-modal/extra-details-modal.component';

import { SuitBuilderService } from '../../suit-builder.service';

import { DesignStage } from '../../../../models/suit-builder/designStage';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';
import { MockupGarmentModalComponent } from '../../utilities/mockup-garment-modal/mockup-garment-modal.component';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'suit-builder-design-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.scss']
})
export class AddonsComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  public DesignStage = DesignStage;

  public errorMessage: string = "";

  public isExtraPantsSelected: boolean = false;
  public isWaisteCoatSelected: boolean = false;

  public currentSuit: any = {};

  constructor(public suitBuilderService: SuitBuilderService, public dialog: MatDialog, public toastyService: ToastyService, public toastyConfig: ToastyConfig) { }

  public ngOnInit(): void {
    this.currentSuit = this.suitBuilderService.suit;
    this.isExtraPantsSelected = this.suitBuilderService.suit.extra_pants;
    this.isWaisteCoatSelected = this.suitBuilderService.suit.waistcoat;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public Previous() {
    this.suitBuilderService.SetDesignStage.emit(DesignStage.PantStyles);
  }

  public Next() {
    this.suitBuilderService.suit.extra_pants = this.isExtraPantsSelected;
    this.suitBuilderService.suit.waistcoat = this.isWaisteCoatSelected;

    this.errorMessage = this.suitBuilderService.ValidateDesignStage();
    if (this.errorMessage === "") {
      if (this.suitBuilderService.isFinerDetailsShown === false) {
        let ExtraDetailsModal = this.dialog.open(ExtraDetailsModalComponent, {
          height: '60%',
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
              height: '60%',
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
    } else {
      var toastOptions: ToastOptions = {
        title: "Error",
        msg: this.errorMessage
      };

      this.toastyService.error(toastOptions);
      console.log();
    }
  }
}
