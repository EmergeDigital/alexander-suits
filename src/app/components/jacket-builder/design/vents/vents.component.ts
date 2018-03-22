import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { JacketBuilderService } from '../../jacket-builder.service';
import { DesignStage } from '../../../../models/jacket-builder/designStage';
import { WizardStage } from '../../../../models/jacket-builder/wizardStage';
import { ExtraDetailsModalComponent } from '../extra-details-modal/extra-details-modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'jacket-builder-design-vents',
  templateUrl: './vents.component.html',
  styleUrls: ['./vents.component.scss']
})
export class VentsComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  private DesignStage = DesignStage;

  private ventsMock: any[] = [
    {"name": "Centre", "desc": "A centre vent style.", "url": "assets/suit-builder/vents/vents-v1.png"},
    {"name": "Side", "desc": "A side vent style.", "url": "assets/suit-builder/vents/vents-v2.png"},
  ];

  private errorMessage: string = "";

  private selectedVent: any = {};
  private isSelectedVent: boolean = false;

  private currentSuit: any = {};

  constructor(private jacketBuilderService: JacketBuilderService, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.currentSuit = this.jacketBuilderService.suit;
    this.selectedVent = this.jacketBuilderService.suit.vents;
    this.isSelectedVent = this.jacketBuilderService.isVentsSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private SelectVent(vent: any) {
    this.selectedVent = vent;
    this.isSelectedVent = true;
  }

  private Previous() {
    this.jacketBuilderService.SetDesignStage.emit(DesignStage.Pockets);
  }

  private Next() {
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
    }
  }
}
