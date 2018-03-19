import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { PantsBuilderService } from '../../pants-builder.service';
import { MeasurementStage } from '../../../../models/pants-builder/measurementsStage';
import { WizardStage } from '../../../../models/pants-builder/wizardStage';

@Component({
  selector: 'pants-builder-measurements-body-type',
  templateUrl: './body-type.component.html',
  styleUrls: ['./body-type.component.scss']
})
export class BodyTypeComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  public MeasurementStage = MeasurementStage;

  public bodyTypesMock: any[] = [
    {"name": "1", "desc": "Collar Description", "url": "assets/pants-builder/pants/pants-v1.png"},
    {"name": "2", "desc": "Collar Description", "url": "assets/pants-builder/pants/pants-v2.png"},
    {"name": "3", "desc": "Collar Description", "url": "assets/pants-builder/pants/pants-v3.png"},
  ];
  
  public selectedBodyType: any = {};
  public isSelectedBodyType: boolean = false;

  public currentSuit: any = {};

  constructor(public pantsBuilderService: PantsBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.pantsBuilderService.suit;
    this.selectedBodyType = this.pantsBuilderService.suit.bodyType;
    
    this.isSelectedBodyType = this.pantsBuilderService.isBodyTypeSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public SelectBodyType(bodyType: any) {
    this.selectedBodyType = bodyType;
    this.isSelectedBodyType = true;
  }

  public Previous(): void {
    this.pantsBuilderService.SetWizardStage.emit(WizardStage.Design);
  }

  public Next(): void {
    this.pantsBuilderService.suit.bodyType = this.selectedBodyType;
    
    this.pantsBuilderService.isBodyTypeSelected = this.isSelectedBodyType;

    this.pantsBuilderService.SetMeasurementsStage.emit(MeasurementStage.GeneralMeasurements);
  }
}
