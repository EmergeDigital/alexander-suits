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
  
  private MeasurementStage = MeasurementStage;

  private bodyTypesMock: any[] = [
    {"name": "1", "desc": "Collar Description", "url": "assets/jacket-builder/pants/pants-v1.png"},
    {"name": "2", "desc": "Collar Description", "url": "assets/jacket-builder/pants/pants-v2.png"},
    {"name": "3", "desc": "Collar Description", "url": "assets/jacket-builder/pants/pants-v3.png"},
  ];
  
  private selectedBodyType: any = {};
  private isSelectedBodyType: boolean = false;

  private currentSuit: any = {};

  constructor(private jacketBuilderService: JacketBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.jacketBuilderService.suit;
    this.selectedBodyType = this.jacketBuilderService.suit.bodyType;
    
    this.isSelectedBodyType = this.jacketBuilderService.isBodyTypeSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private SelectBodyType(bodyType: any) {
    this.selectedBodyType = bodyType;
    this.isSelectedBodyType = true;
  }

  private Previous(): void {
    this.jacketBuilderService.SetWizardStage.emit(WizardStage.FinerDetails);
  }

  private Next(): void {
    this.jacketBuilderService.suit.bodyType = this.selectedBodyType;
    
    this.jacketBuilderService.isBodyTypeSelected = this.isSelectedBodyType;

    this.jacketBuilderService.SetMeasurementsStage.emit(MeasurementStage.GeneralMeasurements);
  }
}
