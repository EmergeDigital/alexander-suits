import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { JacketBuilderService } from '../../jacket-builder.service';
import { MeasurementStage } from '../../../../models/jacket-builder/measurementsStage';
import { WizardStage } from '../../../../models/jacket-builder/wizardStage';

@Component({
  selector: 'jacket-builder-measurements-body-type',
  templateUrl: './body-type.component.html',
  styleUrls: ['./body-type.component.scss']
})
export class BodyTypeComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  public MeasurementStage = MeasurementStage;

  public bodyTypesMock: any[] = [
    {"name": "1", "desc": "Collar Description", "url": "assets/jacket-builder/pants/pants-v1.png"},
    {"name": "2", "desc": "Collar Description", "url": "assets/jacket-builder/pants/pants-v2.png"},
    {"name": "3", "desc": "Collar Description", "url": "assets/jacket-builder/pants/pants-v3.png"},
  ];
  
  public selectedBodyType: any = {};
  public isSelectedBodyType: boolean = false;

  public currentSuit: any = {};

  constructor(public jacketBuilderService: JacketBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.jacketBuilderService.suit;
    this.selectedBodyType = this.jacketBuilderService.suit.bodyType;
    
    this.isSelectedBodyType = this.jacketBuilderService.isBodyTypeSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public SelectBodyType(bodyType: any) {
    this.selectedBodyType = bodyType;
    this.isSelectedBodyType = true;
  }

  public Previous(): void {
    this.jacketBuilderService.SetWizardStage.emit(WizardStage.FinerDetails);
  }

  public Next(): void {
    this.jacketBuilderService.suit.bodyType = this.selectedBodyType;
    
    this.jacketBuilderService.isBodyTypeSelected = this.isSelectedBodyType;

    this.jacketBuilderService.SetMeasurementsStage.emit(MeasurementStage.GeneralMeasurements);
  }
}
