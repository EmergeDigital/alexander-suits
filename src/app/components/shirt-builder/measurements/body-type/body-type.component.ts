import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { ShirtBuilderService } from '../../shirt-builder.service';
import { MeasurementStage } from '../../../../models/shirt-builder/measurementsStage';
import { WizardStage } from '../../../../models/shirt-builder/wizardStage';

@Component({
  selector: 'shirt-builder-measurements-body-type',
  templateUrl: './body-type.component.html',
  styleUrls: ['./body-type.component.scss']
})
export class BodyTypeComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  private MeasurementStage = MeasurementStage;

  private bodyTypesMock: any[] = [
    {"name": "1", "desc": "Collar Description", "url": "assets/shirt-builder/pants/pants-v1.png"},
    {"name": "2", "desc": "Collar Description", "url": "assets/shirt-builder/pants/pants-v2.png"},
    {"name": "3", "desc": "Collar Description", "url": "assets/shirt-builder/pants/pants-v3.png"},
  ];
  
  private selectedBodyType: any = {};
  private isSelectedBodyType: boolean = false;

  private currentSuit: any = {};

  constructor(private shirtBuilderService: ShirtBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.shirtBuilderService.suit;
    this.selectedBodyType = this.shirtBuilderService.suit.bodyType;
    
    this.isSelectedBodyType = this.shirtBuilderService.isBodyTypeSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private SelectBodyType(bodyType: any) {
    this.selectedBodyType = bodyType;
    this.isSelectedBodyType = true;
  }

  private Previous(): void {
    this.shirtBuilderService.SetWizardStage.emit(WizardStage.FinerDetails);
  }

  private Next(): void {
    this.shirtBuilderService.suit.bodyType = this.selectedBodyType;
    
    this.shirtBuilderService.isBodyTypeSelected = this.isSelectedBodyType;

    this.shirtBuilderService.SetMeasurementsStage.emit(MeasurementStage.GeneralMeasurements);
  }
}
