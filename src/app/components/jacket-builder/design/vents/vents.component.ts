import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { JacketBuilderService } from '../../jacket-builder.service';
import { DesignStage } from '../../../../models/jacket-builder/designStage';
import { WizardStage } from '../../../../models/jacket-builder/wizardStage';
import { ExtraDetailsModalComponent } from '../extra-details-modal/extra-details-modal.component';
import { MatDialog } from '@angular/material';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'jacket-builder-design-vents',
  templateUrl: './vents.component.html',
  styleUrls: ['./vents.component.scss']
})
export class VentsComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  public DesignStage = DesignStage;

  public ventsMock: any[] = [
    {"name": "Centre", "desc": "A centre vent style.", "url": "assets/suit-builder/vents/vents-v1.png"},
    {"name": "Side", "desc": "A side vent style.", "url": "assets/suit-builder/vents/vents-v2.png"},
  ];

  public errorMessage: string = "";

  public selectedVent: any = {};
  public isSelectedVent: boolean = false;

  public currentSuit: any = {};

  constructor(public jacketBuilderService: JacketBuilderService, public dialog: MatDialog, public toastyService: ToastyService, public toastyConfig: ToastyConfig) { }

  public ngOnInit(): void {
    this.currentSuit = this.jacketBuilderService.suit;
    this.selectedVent = this.jacketBuilderService.suit.vents;
    this.isSelectedVent = this.jacketBuilderService.isVentsSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public SelectVent(vent: any) {
    this.selectedVent = vent;
    this.isSelectedVent = true;
  }

  public Previous() {
    this.jacketBuilderService.SetDesignStage.emit(DesignStage.Pockets);
  }

  public Next() {
    this.jacketBuilderService.suit.vents = this.selectedVent;
    this.jacketBuilderService.isVentsSelected = this.isSelectedVent;

    this.errorMessage = this.jacketBuilderService.ValidateDesignStage();
    if (this.errorMessage === "") {
      if (this.jacketBuilderService.isFinerDetailsShown === false) {
        let ExtraDetailsModal = this.dialog.open(ExtraDetailsModalComponent, {
          height: '60%',
        });

        ExtraDetailsModal.afterClosed().subscribe(result => {
          this.jacketBuilderService.isFinerDetailsShown = true;

          if (result === "true") {
            this.jacketBuilderService.isFinerDetailsAccepted = true;
            this.jacketBuilderService.SetWizardStage.emit(WizardStage.FinerDetails);
          }
          else {
            this.jacketBuilderService.isFinerDetailsAccepted = false;
              this.jacketBuilderService.SetWizardStage.emit(WizardStage.Measurements);
          }
        });
      } else {
        this.jacketBuilderService.SetWizardStage.emit(WizardStage.Measurements);
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
